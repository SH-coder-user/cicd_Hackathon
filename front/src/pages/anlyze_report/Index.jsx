// pages/ReportPage.jsx
import React, { useEffect, useState } from "react";
import { Reports } from "../../utils/api/ReportAPI";
import { hydrateSummary, DUMMY_SUMMARY } from "../../utils/reportDummy";
import ReportContent from "./Report";

export default function ReportPage() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 1) 세션에 기간이 있으면 사용, 없으면 더미 기간
    const start = sessionStorage.getItem("reportStart") || DUMMY_SUMMARY.start;
    const end = sessionStorage.getItem("reportEnd") || DUMMY_SUMMARY.end;

    setLoading(true);
    Reports.getReport({ start, end })
      .then((server) => setSummary(hydrateSummary(server)))
      .catch(() => setSummary(hydrateSummary(null))) // 실패해도 더미로 대체
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>불러오는 중…</p>;
  if (!summary) return <p>데이터 없음</p>;

  return <ReportContent summary={summary} />;
}
