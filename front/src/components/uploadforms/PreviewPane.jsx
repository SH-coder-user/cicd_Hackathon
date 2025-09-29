// src/components/upload/parts/PreviewPane.jsx
import React from "react";

export default function PreviewPane({ file, previewUrl, onRemove }) {
  return (
    <div className="preview-pane">
      <div className="preview-thumb">
        {previewUrl ? (
          <img src={previewUrl} alt="preview" />
        ) : (
          <div className="noimg" />
        )}
      </div>
      <div className="preview-meta">
        <div className="name">{file?.name}</div>
        <div className="meta">
          {file ? `크기: ${(file.size / 1024 / 1024).toFixed(2)} MB` : ""}
        </div>
      </div>
      <button className="btn ghost" onClick={onRemove}>제거</button>
    </div>
  );
}
