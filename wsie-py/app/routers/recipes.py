# app/routers/recipes.py
from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from openai import OpenAI
import os, base64, json
from io import BytesIO
from PIL import Image

router = APIRouter()

def _ensure_image(img_bytes: bytes) -> None:
    # 이미지 유효성 검사 (잘못된 파일로 인한 예외를 조기에 차단)
    Image.open(BytesIO(img_bytes)).verify()

def _to_data_url(img_bytes: bytes) -> str:
    # 간단 추정: jpg/png만 다룬다고 가정 (필요시 content-type 분기 추가)
    b64 = base64.b64encode(img_bytes).decode("utf-8")
    return f"data:image/jpeg;base64,{b64}"

def _fallback_recipes():
    # LLM 실패/429 시 폴백 JSON (예시)
    return {
        "use_llm": False,
        "fallback_reason": "quota_or_error",
        "recipes": [
            {
                "name": "양파전",
                "ingredients": ["양파", "밀가루", "소금", "식용유"],
                "steps": ["양파 채썰기", "반죽 섞기", "팬에 부치기"],
            },
            {
                "name": "양파볶음",
                "ingredients": ["양파", "간장", "설탕", "참기름"],
                "steps": ["양파 채썰기", "간장과 볶기", "참기름 마무리"],
            },
        ],
    }

@router.post("/api/v1/recipes")
async def analyze_and_recommend(file: UploadFile = File(...)):
    # 0) OPENAI_API_KEY 확인
    if not os.getenv("OPENAI_API_KEY"):
        return JSONResponse(_fallback_recipes(), status_code=200)

    # 1) 이미지 읽기 + 검증
    img_bytes = await file.read()
    try:
        _ensure_image(img_bytes)
    except Exception:
        raise HTTPException(status_code=400, detail="유효한 이미지 파일이 아닙니다.")

    # 2) 멀티모달 호출: GPT-4o mini에 이미지(data URL) + JSON 포맷 강제
    prompt = (
        "업로드된 음식/재료 이미지를 보고, 이 재료로 만들 수 있는 한국 요리 3개를 JSON으로만 반환하세요. "
        "JSON 최상위 키는 'recipes'이고, 각 요소는 {name, ingredients[], steps[]} 필드를 반드시 포함합니다. "
        "설명 문장이나 코드블록 없이 순수 JSON만 출력하세요."
    )
    data_url = _to_data_url(img_bytes)

    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    try:
        resp = client.chat.completions.create(
            model="gpt-4o-mini",
            response_format={"type": "json_object"},
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": prompt},
                        {"type": "image_url", "image_url": {"url": data_url}},
                    ],
                }
            ],
        )
        payload = resp.choices[0].message.content
        data = json.loads(payload)
        # 응답에 플래그 추가(프론트에서 배지 사용 가능)
        data["use_llm"] = True
        return JSONResponse(data, status_code=200)

    except Exception as e:
        # 429(insufficient_quota) 등 모든 예외는 폴백
        return JSONResponse(_fallback_recipes(), status_code=200)

