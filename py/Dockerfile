FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 앱 소스
COPY app ./app

# 데이터/인덱스 경로가 상대경로로 쓰이므로 작업디렉토리 일치
ENV PYTHONUNBUFFERED=1
EXPOSE 8000

# OPENAI_API_KEY는 런타임에 환경변수로 주입
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

