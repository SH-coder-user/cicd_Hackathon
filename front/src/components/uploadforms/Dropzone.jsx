// src/components/upload/parts/Dropzone.jsx
import React, { useState } from "react";

export default function Dropzone({ hasFile, previewUrl, file, onPick, onDropFile }) {
  const [over, setOver] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) onDropFile(f);
  };

  const prevent = (e) => {
    e.preventDefault();
    if (e.type === "dragover") setOver(true);
    if (e.type === "dragleave") setOver(false);
  };

  return (
    <div
      className={`dropzone ${over ? "is-over" : ""} ${!hasFile ? "with-corners" : ""}`}
      onClick={onPick}
      onDragOver={prevent}
      onDragLeave={prevent}
      onDrop={handleDrop}
    >
      {/* 모서리 장식 */}
      {!hasFile && (
        <>
          <div className="corner tl" />
          <div className="corner tr" />
          <div className="corner bl" />
          <div className="corner br" />
        </>
      )}

      {/* 로더 (파일 없을 때) */}
      {!hasFile && (
        <div className="loader-center">
          <div className="loader">
            <span>S</span><span>c</span><span>a</span><span>n</span>
          </div>
          <p className="hint">이미지를 드래그하거나 클릭해서 업로드</p>
        </div>
      )}

      {/* 배경에 살짝 프리뷰 넣고 싶다면 (필요 없으면 제거 가능) */}
      {hasFile && previewUrl && (
        <div className="drop-preview-bg" aria-hidden>
          <img src={previewUrl} alt="" />
        </div>
      )}
    </div>
  );
}
