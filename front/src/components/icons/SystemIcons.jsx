// 벡터 아이콘들 (currentColor 사용)
export const HomeIcon = (props) => (
  <svg viewBox="0 0 50 50" width="20" height="20" fill="currentColor" aria-hidden {...props}>
    <path d="M 25 1.0507812 C 24.7825 1.0507812 24.565859 1.1197656 24.380859 1.2597656 L 1.3808594 19.210938 C 0.95085938 19.550938 0.8709375 20.179141 1.2109375 20.619141 C 1.5509375 21.049141 2.1791406 21.129062 2.6191406 20.789062 L 4 19.710938 L 4 46 C 4 46.55 4.45 47 5 47 L 19 47 L 19 29 L 31 29 L 31 47 L 45 47 C 45.55 47 46 46.55 46 46 L 46 19.710938 L 47.380859 20.789062 C 47.570859 20.929063 47.78 21 48 21 C 48.3 21 48.589063 20.869141 48.789062 20.619141 C 49.129063 20.179141 49.049141 19.550938 48.619141 19.210938 L 25.619141 1.2597656 C 25.434141 1.1197656 25.2175 1.0507812 25 1.0507812 z M 35 5 L 35 6.0507812 L 41 10.730469 L 41 5 L 35 5 z"></path>
  </svg>
);

export const ServiceIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
    {/* 포크(오른쪽) + 스푼(왼쪽) */}
    <path d="M4 3c1.7 0 3 1.8 3 4s-1.3 4-3 4v9" />
    <path d="M10 3v7" />
    <path d="M14 3v10a3 3 0 0 0 6 0V3" />
  </svg>
);

export const ReportsIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
    <path d="M3 21h18" />
    <path d="M7 21V10" />
    <path d="M12 21V4" />
    <path d="M17 21v-7" />
  </svg>
);

export const HistoryIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v6l4 2" />
  </svg>
);
