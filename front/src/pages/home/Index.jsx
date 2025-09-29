import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tomato from "../../assets/tomato.png"; // 확장자에 맞게 수정(.svg/.jpg 등)

import "./styles/Landing.css";

export default function Landing() {
  const nav = useNavigate();

  // 이 페이지에서는 헤더의 네비/로그인 버튼 숨김
  useEffect(() => {
    document.body.classList.add("landing-mode");
    return () => document.body.classList.remove("landing-mode");
  }, []);

  return (
    <main className="landing container">
      <div className="landing__text">
        <p className="landing__hint">임박된 제품이 생산되었습니다.</p>
        <h1 className="landing__title">메뉴를 선정하시겠습니까?</h1>
      </div>

      <div className="landing__hero">
        <button
          type="button"
          className="landing__cta"
          onClick={() => nav("/files")}
        >
          WSIE 사용 <span className="arrow" aria-hidden>›</span>
        </button>

        <img
          className="landing__tomato"
          src={tomato}
          alt=""
          draggable="false"
        />
      </div>
    </main>
  );
}
