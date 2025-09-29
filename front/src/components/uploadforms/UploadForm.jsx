// src/components/upload/UploadForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Utils } from "../../utils/api/FileAPI";

export default function UploadForm() {
  const nav = useNavigate();
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("이미지를 선택하세요!");
    setBusy(true);
    try {
      const res = await Utils.file_upload(file);
      sessionStorage.setItem("graphAnalyzeResult", JSON.stringify(res));
      nav("/reports");
    } catch (err) {
      console.error("분석 실패", err);
      alert("분석 요청 중 오류가 발생했습니다.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept="image/*"
             onChange={(e) => setFile(e.target.files?.[0] ?? null)}
             disabled={busy}/>
      <button type="submit" disabled={!file || busy}>
        {busy ? "분석 중…" : "분석하기"}
      </button>
    </form>
  );
}