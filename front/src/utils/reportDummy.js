// utils/reportDummy.js
export const DUMMY_SUMMARY = Object.freeze({
  start: "2025-02-20",
  end:   "2025-09-23",
  wasteCost: 1200000,        // 원
  carbonReductionKg: 42,     // kg
  marginImprovement: 0.07,   // 7%
  extras: {
    주요원인: [
      `포션 과다
- 브런치 메인 1.0인분 기준 실제 제공량 1.25배
- 평균 420g → 525g 제공으로 잔반 증가`,

      `사이드 감자 잔존
- 점심 러시 이후 재고 소진 위해 일괄 증량 제공
- 고객 포만감↑, 잔반율 22%p 상승`,

      `소스 염도 불균형
- 소금 10% 과다 측정 구간 발생(주 2회)
- 짠맛 반감 피드백 다수`,

      `조리 배치 규모 과도
- 60분 단위 대량 조리
- 마지막 트레이 온도·식감 저하(수분 손실 8~10%)`,

      `메뉴-고객 적합도 미스
- 저염/라이트 선호 증가
- 크림·버터 베이스 메뉴 비중 48%`,

      `예측 수요 편차 미반영
- 금·토 러시 후 일요일 생산량 동일 적용
- 미판매/폐기 누적`
    ],
    개선제안: [
      `표준 포션 조정
- 메인 525g → 450g (-15%)
- 사이드 감자 100g → 70g 축소
- 대체 샐러드 옵션 제공`,

      `마감 전 생산 상한선
- 마감 120분 전 예측 수요 대비 0.7× 적용
- 30분 단위 롤링 소량 조리`,

      `소스 레시피 개선
- 염도 -10%
- 감칠맛(양파/표고 스톡) +5% 보강
- 풍미 유지하며 짠맛 완화`,

      `라이트 옵션 고지
- '저염/무소스/하프' 선택지 메뉴 보드·키오스크 기본 노출`,

      `사이드 교체 테스트
- 감자 → 피클/코울슬로 A/B(2주) 실험
- 잔반율·고객만족 동시 측정`,

      `러시 후 재고 관리
- 13:30 이후 온장 보관 30분 경과분 우선 소진
- 45분 경과 시 할인 라벨 부착`,

      `수요예측 규칙 추가
- 일요일 계수 -20%
- 악천후/시험주 -15%
- 전일 21시 스케줄 재계산`
    ]
  }
});



export const hydrateSummary = (server) => {
  const s = server || {};
  return {
    start: s.start ?? DUMMY_SUMMARY.start,
    end:   s.end ?? DUMMY_SUMMARY.end,
    wasteCost: (s.wasteCost ?? s.waste_cost) ?? DUMMY_SUMMARY.wasteCost,
    carbonReductionKg: (s.carbonReductionKg ?? s.carbon_reduction_kg) ?? DUMMY_SUMMARY.carbonReductionKg,
    marginImprovement: (s.marginImprovement ?? s.margin_improvement) ?? DUMMY_SUMMARY.marginImprovement,
    extras: s.extras ?? DUMMY_SUMMARY.extras,
  };
};
