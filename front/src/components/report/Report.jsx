// src/components/report/ReportView.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import hero from "../../assets/hero.jpg";
import "./styles/report.css";

// API 유틸
import { StockAPI } from "../../utils/api/StockAPI";      // ⬅ (앞서 만든 expiring)
import { RecipeAPI } from "../../utils/api/RecipeAPI";    // ⬅ recommendByStock 포함

export default function ReportView() {
  const nav = useNavigate();
  const [report, setReport] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("graphAnalyzeResult");
    if (raw) setReport(JSON.parse(raw));
  }, []);

  if (!report) return <p className="report-empty">데이터 없음</p>;
  const imps = Array.isArray(report.improvements) ? report.improvements : [];

  // Firestore 날짜 문자열 → 남은 일수 계산
  const daysLeftFromISO = (iso) => {
    if (!iso) return null;
    const d = new Date(iso);
    const today = new Date();
    // 자정 기준으로 계산
    const today0 = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const diff = Math.ceil((d - today0) / 86400000);
    return isNaN(diff) ? null : diff;
  };

  // 재고 문서 맵 -> 추천 API 페이로드 정규화
  const normalize = (doc) => {
    const name = doc.name ?? doc.stock_name ?? doc.itemName ?? "";
    const quantity = Number(doc.quantity ?? doc.stock_qty ?? 0);
    const daysLeft =
      doc.daysLeft ?? daysLeftFromISO(doc.stock_expiration_date ?? doc.expirationDate ?? doc.bestBefore);
    return { name, quantity, daysLeft };
  };

  const handleGenerate = async () => {
    if (busy) return;
    setBusy(true);
    try {
      // 1) 임박 재고 조회
      const { items } = await StockAPI.expiring({ days: 3, limit: 20 });
      // 2) 추천 호출
      const payload = items.map(normalize).filter(x => x.name);
      const menus = await RecipeAPI.recommendByStock(payload, 3);

      // 페이지 이동 시 state + 세션 모두 저장 (새로고침 대비)
      const safeMenus = Array.isArray(menus) ? menus : [];
      sessionStorage.setItem("recommendedMenus", JSON.stringify(safeMenus));
      nav("/recipe", { state: { menus: safeMenus } });
    } catch (e) {
      console.error("레시피 생성 실패:", e);
      alert("레시피 생성 중 오류가 발생했습니다.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="report-wrap">
      <div className="report-headerbar">
        <h2 className="report-title">레시피 개선사항</h2>
        <button className="btn-primary" onClick={handleGenerate} disabled={busy}>
          {busy ? "생성 중…" : "레시피 생성하기"}
        </button>
      </div>

      <div className="report-grid">
        <div className="report-card report-image">
          <img src={hero} alt="분석 대상 음식" />
        </div>

        <div className="report-card report-content">
          <p className="report-text">
            <strong>보고서: </strong>
            {report.report}
          </p>

          {imps.length > 0 && (
            <>
              <h3 className="report-subtitle">개선 제안</h3>
              <ul className="report-list">
                {imps.map((imp, i) => (
                  <li key={i}>{imp?.suggestion || "-"}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      <div className="report-spacer" />
    </section>
  );
}
