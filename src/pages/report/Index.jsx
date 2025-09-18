import React, { useState } from "react";
import UploadForm from "../../components/uploadforms/UploadForm";

function ReportPage() {
  const [report, setReport] = useState(null);

  return (
    <div>
      <h1>AI 잔반 분석</h1>
      <UploadForm setReport={setReport} />

      {report && (
        <div>
          <h2>분석 결과</h2>
          <p><b>메뉴:</b> {report.menu}</p>
          <p><b>잔반 비율:</b> {report.waste_ratio * 100}%</p>
          <p><b>개선 제안:</b> {report.suggestion}</p>
        </div>
      )}
    </div>
  );
}

export default ReportPage;
