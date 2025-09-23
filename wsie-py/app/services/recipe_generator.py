# app/services/recipe_generator.py
from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_recipe_from_image_desc(desc: str):
    """
    desc: GPT 이미지 분석 결과 (예: "양파가 있는 사진")
    """
    prompt = f"""
    다음은 사용자가 가진 재료입니다: {desc}.
    이 재료로 만들 수 있는 한국 요리 3개를 JSON 형식으로 추천해줘.
    JSON 키는 'recipes' 이고, 각 아이템은 {{"name": 요리이름, "ingredients": [재료목록], "steps": [간단한조리순서]}} 구조여야 한다.
    절대로 JSON 이외의 다른 텍스트는 포함하지 마라.
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        response_format={"type": "json_object"}
    )

    return response.choices[0].message.content

