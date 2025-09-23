# app/firebase_client.py
from pathlib import Path
import firebase_admin
from firebase_admin import credentials

# 도커 런타임에 마운트될 경로(Compose에서 설정)
SA_PATH = Path("/run/secrets/firebase_sa.json")

if not firebase_admin._apps:
    cred = credentials.Certificate(str(SA_PATH))
    # Firestore만 쓸 경우 이 한 줄이면 충분합니다.
    firebase_admin.initialize_app(cred)

    # 만약 Realtime Database를 쓰고 싶다면, 위 대신 다음처럼:
    # firebase_admin.initialize_app(cred, {
    #     "databaseURL": "https://<YOUR_PROJECT_ID>.firebaseio.com"
    # })
