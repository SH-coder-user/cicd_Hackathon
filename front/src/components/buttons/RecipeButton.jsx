// src/components/buttons/RecipeButton.jsx
import React from "react";
import "./RecipeButtons.css";

export default function RecipeButtons({
  page = 1,
  total = null,          // 전체 페이지 수가 있다면 숫자 전달, 없으면 중앙에 현재 페이지만 노출
  onPrev,
  onNext,
  onHome,
}) {
  return (
    <div className="rb-wrap">
      {/* 좌측: < > */}
      <div className="rb-left">
        <button
          type="button"
          className="rb-icon"
          onClick={onPrev}
          aria-label="이전"
        >
          &lt;
        </button>
        <button
          type="button"
          className="rb-icon"
          onClick={onNext}
          aria-label="다음"
        >
          &gt;
        </button>
      </div>

      {/* 가운데: 페이지 인덱스 */}
      <div className="rb-center">
        {total ? (
          <span className="rb-page">{page} / {total}</span>
        ) : (
          <span className="rb-page">&lt; {page} &gt;</span>
        )}
      </div>

      {/* 우측: 홈으로 이동 (알약 버튼) */}
      <div className="rb-right">
        <button
          type="button"
          className="rb-home"
          onClick={onHome}
        >
          홈으로 이동
        </button>
      </div>
    </div>
  );
}
