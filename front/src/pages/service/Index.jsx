// src/pages/service/ServicePage.jsx
import { useEffect, useState } from "react";
import ReportView from "../../components/report/Report";

export default function ServicePage() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("graphAnalyzeResult");
      if (raw) {
        setResult(JSON.parse(raw));
      }
    } catch (e) {
      console.error("세션 결과 읽기 실패:", e);
    }
  }, []);

  return (
    <div>
      {/* ReportView에 result 내려줌 */}
      <ReportView result={result} />
    </div>
  );
}
