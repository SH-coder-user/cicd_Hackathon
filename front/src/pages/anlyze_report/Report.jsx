// components/report/ReportContent.jsx
import React from "react";
import "./Report.css";

export default function ReportContent({ summary }) {
  const { start, end, wasteCost, carbonReductionKg, marginImprovement, extras } = summary || {};
  return (
    <main className="report-main">
      <div className="report-header">
        <h1 className="report-title">생성형 AI 보고서</h1>
        <p className="report-sub">잔반 원인 · 개선 · 환경/비용 효과</p>
      </div>

      <section className="report-section">
        <h2 className="section-title">기간</h2>
        <p>{start} ~ {end}</p>
      </section>

      <section className="report-section">
        <h2 className="section-title">핵심 지표</h2>
        <ul>
          <li>폐기비용: {wasteCost}</li>
          <li>탄소 절감(kg): {carbonReductionKg}</li>
          <li>마진 개선율: {marginImprovement}</li>
        </ul>
      </section>
      {extras && (
        <section className="report-section">
          <h2 className="section-title">추가 지표</h2>
          <ul>
            {Object.entries(extras).map(([k, v]) => (
              <li key={k}>
                <strong>{k}</strong>
                {Array.isArray(v) ? (
                  <div>
                    {v.map((item, idx) => (
                      <p key={idx} className="report-text">{item}</p>
                    ))}
                  </div>
                ) : (
                  <p className="report-text">{String(v)}</p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
