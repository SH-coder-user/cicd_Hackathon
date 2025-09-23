FROM python:3.11-slim

WORKDIR /app
COPY wsie-py/requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

COPY wsie-py/app /app/app

# 비밀키는 이미지에 넣지 않고 런타임에 마운트
ENV GOOGLE_APPLICATION_CREDENTIALS=/run/secrets/firebase_sa.json

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host","0.0.0.0","--port","8000"]
