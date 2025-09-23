# -*- coding: utf-8 -*-
"""음식 분석 스크립트 (LLM 비활성화 안전가드 적용)"""

from dotenv import load_dotenv
load_dotenv()

import base64
import os
import json
from typing import TypedDict

# 외부 라이브러리 임포트 (패키지는 설치되어 있다고 가정)
from openai import OpenAI
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
from langgraph.graph import StateGraph, END

# -----------------------------
# 0. 초기화 (LLM 비활성화 가드)
# -----------------------------
USE_LLM = True  # 기본값: 사용
try:
    # OPENAI_API_KEY가 없거나 잘못되면 여기서 예외 발생 가능
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    llm = ChatOpenAI(model="gpt-4o", temperature=0, api_key=os.getenv("OPENAI_API_KEY"))
except Exception as e:
    print("🚨 OpenAI 또는 LangChain 초기화 실패. LLM 기능을 비활성화하고 계속 진행합니다.")
    print("원인:", e)
    USE_LLM = False
    client = None
    llm = None

# -----------------------------
# 상태 정의
# -----------------------------
class State(TypedDict):
    analysis: str
    report: str
    improvements: str

# -----------------------------
# 1. 멀티모달 분석 함수
# -----------------------------
def analyze_food(image_path: str) -> str:
    """이미지 경로를 받아 분석 결과를 JSON 문자열로 반환."""
    # LLM 비활성 시: 실제 분석 대신 더미 결과 반환
    if not USE_LLM:
        dummy = {
            "food": "unknown",
            "leftover_ratio": "unknown",
            "note": "LLM disabled - returning dummy analysis"
        }
        return json.dumps(dummy, ensure_ascii=False)

    try:
        with open(image_path, "rb") as f:
            img_bytes = f.read()
        img_base64 = base64.b64encode(img_bytes).decode("utf-8")

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": "당신은 남긴 음식 분석 전문가입니다. JSON 형식으로만 답변하세요.",
                },
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": "이 음식 사진을 보고 음식 종류와 남은 양을 JSON 형식으로 분석해주세요.",
                        },
                        {
                            "type": "image_url",
                            "image_url": {"url": f"data:image/jpeg;base64,{img_base64}"},
                        },
                    ],
                },
            ],
        )
        return response.choices[0].message.content
    except FileNotFoundError:
        print(f"오류: 이미지 파일을 찾을 수 없습니다. 경로를 확인하세요: {image_path}")
        return None
    except Exception as e:
        print(f"분석 중 오류 발생: {e}")
        return None

# -----------------------------
# 2. 단일 노드: report + improve 통합
# -----------------------------
if USE_LLM:
    combined_prompt = PromptTemplate(
        input_variables=["analysis"],
        template="""
분석 결과: {analysis}

1) 순수 텍스트 잔반 리포트를 작성하세요.
2) 반드시 개선 방안을 1~3개 JSON 배열 형식으로 작성하세요.
3) 절대 improvements를 비워두지 마세요.
4) 출력은 **순수 JSON만** 반환하세요. Markdown, 리스트, 글머리표 등은 절대 포함하지 마세요.

출력 예시(JSON 형식):
{{
  "report": "오늘 제공된 음식의 잔반이 ...",
  "improvements": [
    {{"suggestion": "샐러드 양 조절"}},
    {{"suggestion": "드레싱 종류 다양화"}}
  ]
}}
"""
    )
    combined_chain = combined_prompt | llm
else:
    combined_prompt = None
    combined_chain = None

def combined_node(state: State):
    # LLM 비활성: 고정 리포트/개선안 반환
    if not USE_LLM:
        try:
            parsed = json.loads(state.get("analysis") or "{}")
        except Exception:
            parsed = {}
        return {
            "report": "LLM 비활성 상태: 더미 리포트입니다. 실제 분석 모델을 활성화하면 상세 리포트가 생성됩니다.",
            "improvements": [
                {"suggestion": "모델 API 키 설정 후 재실행"},
                {"suggestion": "샘플 이미지를 다양화하여 테스트"},
            ],
        }

    # LLM 활성 경로
    result = combined_chain.invoke({"analysis": state["analysis"]})
    try:
        return json.loads(result.content)
    except json.JSONDecodeError:
        return {"report": result.content, "improvements": [{"suggestion": "LLM 출력 파싱 실패"}]}

# -----------------------------
# 3. LangGraph 구성
# -----------------------------
def build_graph():
    """LLM 여부와 무관하게 invoke()를 제공하는 실행기를 반환."""
    if not USE_LLM:
        # LangGraph 없이도 동일 인터페이스를 흉내내는 더미 실행기
        class DummyApp:
            def invoke(self, init_state):
                # analyze 노드 스킵하고 combined_node만 수행
                return combined_node(init_state)
        return DummyApp()

    # 실제 LangGraph 사용
    graph = StateGraph(State)
    graph.add_node("analyze", lambda s: {"analysis": s["analysis"]})
    graph.add_node("combined", combined_node)
    graph.set_entry_point("analyze")
    graph.add_edge("analyze", "combined")
    graph.add_edge("combined", END)
    return graph.compile()

# -----------------------------
# 4. 메인 실행 함수
# -----------------------------
def main():
    print("--- 음식물 쓰레기 분석기 ---")
    image_path = input("분석할 이미지 파일의 경로를 입력하세요 (예: ./data/Waffles50.jpg): ")

    if not os.path.exists(image_path):
        print(f"오류: '{image_path}' 경로에 파일이 없습니다.")
        return

    print("\n1. 이미지를 분석 중입니다...")
    analysis_result = analyze_food(image_path)

    if analysis_result:
        print("분석 완료!")
        app = build_graph()
        print("\n2. 리포트 및 개선 방안을 생성 중입니다...")
        final_output = app.invoke({"analysis": analysis_result})
        print("생성 완료!")

        print("\n--- 최종 결과 ---")
        print("📌 리포트:")
        print(final_output.get("report", "리포트 생성 실패"))

        print("\n📌 개선 방안:")
        improvements = final_output.get("improvements", [])
        if isinstance(improvements, list):
            for item in improvements:
                print(f"- {item.get('suggestion', '개선 방안 없음')}")
        else:
            print(improvements)

if __name__ == "__main__":
    main()
