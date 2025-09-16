FROM python:3.12-slim

WORKDIR /app
COPY index.html /app/

EXPOSE 8501
# 안전한 바인딩(모든 인터페이스), 포그라운드 실행
CMD ["python", "-m", "http.server", "8501", "--directory", "/app", "--bind", "0.0.0.0"]
