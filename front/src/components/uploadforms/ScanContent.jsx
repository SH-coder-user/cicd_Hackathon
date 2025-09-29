// src/components/upload/ScanContent.jsx
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Utils } from "../../utils/api/FileAPI";
import Dropzone from "./Dropzone";
import PreviewPane from "./PreviewPane";
import "./scan.css";

const SESSION_KEY = "graphAnalyzeResult";
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export default function ScanContent() {
  const nav = useNavigate();
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [busy, setBusy] = useState(false);

  const openPicker = () => fileInputRef.current?.click();

  const validateAndSet = (f) => {
    if (!f) return;
    if (!f.type?.startsWith("image/")) {
      alert("이미지 파일만 업로드할 수 있습니다.");
      return;
    }
    if (f.size > MAX_SIZE) {
      alert("파일 크기는 10MB를 초과할 수 없습니다.");
      return;
    }
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setPreviewUrl(e.target?.result || null);
    reader.readAsDataURL(f);
  };

  const onInputChange = (e) => validateAndSet(e.target.files?.[0]);

  const clearFile = () => {
    setFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const submit = async () => {
    if (!file) return;
    setBusy(true);
    try {
      const res = await Utils.file_upload(file);
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(res));
      nav("/reports");
    } catch (e) {
      console.error("upload/analyze failed:", e);
      alert("분석 요청 중 오류가 발생했습니다.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="scan-wrap">
      <section className="scan-stage">
        <Dropzone
          hasFile={!!file}
          previewUrl={previewUrl}
          file={file}
          onPick={openPicker}
          onDropFile={(f) => validateAndSet(f)}
        />

        {/* 숨은 input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onInputChange}
          className="hidden-input"
        />

        {file && (
          <PreviewPane
            file={file}
            previewUrl={previewUrl}
            onRemove={clearFile}
          />
        )}

        <div className="scan-actions">
          <button className="btn green" onClick={openPicker} disabled={busy}>
            {file ? "파일 변경" : "파일 선택"}
          </button>
          <button
            className="btn red"
            onClick={submit}
            disabled={!file || busy}
            title={!file ? "파일을 먼저 선택하세요" : undefined}
          >
            {busy ? "분석 중…" : "제출"}
          </button>
        </div>
      </section>
    </main>
  );
}
