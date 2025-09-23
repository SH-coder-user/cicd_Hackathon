# app/routers/firebase_ping.py
import time
from fastapi import APIRouter
from firebase_admin import firestore  # Firestore 사용 예시
# RTDB를 원하면: from firebase_admin import db

# 초기화 강제 import (부작용으로 앱 초기화)
from app import firebase_client  # noqa: F401

router = APIRouter()

@router.get("/firebase/ping")
def ping_firestore():
    db = firestore.client()
    payload = {"ok": True, "ts": int(time.time() * 1000)}
    # 쓰기
    db.collection("healthcheck").document("ping").set(payload)
    # 읽기
    snap = db.collection("healthcheck").document("ping").get()
    return snap.to_dict()
