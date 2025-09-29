import React from "react";
import "./RecipeFooter.css";

export default function RecipeFooter({ page = 1, total = 1, onHome }) {
  return (
    <div className="rf-wrap">
      <div /> {/* 좌측 비움(독립 div 보장) */}
      <div className="rf-center">{page} / {total}</div>
      <div className="rf-right">
        <button type="button" className="rf-home" onClick={onHome}>
          홈으로 이동
        </button>
      </div>
    </div>
  );
}
