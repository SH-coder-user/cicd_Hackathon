# app/routers/food_analyze.py
from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
import io
from PIL import Image  # pillow 필요: pip install pillow

router = APIRouter()

@router.post("/food/analyze")
async def analyze_food_api(file: UploadFile = File(...)):
    try:
        # 1) 파일 로드/검사
        content = await file.read()
        Image.open(io.BytesIO(content))  # 간단한 이미지 유효성 확인

        # 2) 실제 분석 호출 (OpenAI 비활성 시 더미 응답)
        # TODO: 당신의 analyze_food() 붙이기
        # analysis_json = analyze_food_by_your_logic(content)
        analysis_json = {"food": "unknown", "leftover_ratio": "unknown"}

        # 3) 리포트/개선안 생성 (OpenAI 없는 경우 더미)
        report = "샘플 리포트 (모델 비활성 상태)"
        improvements = [{"suggestion": "메뉴 구성 최적화"}, {"suggestion": "분량 조절"}]

        return JSONResponse({
            "report": report,
            "improvements": improvements,
            "analysis": analysis_json
        })
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"분석 실패: {e}")
