import React, { useEffect, useRef, useState } from "react";
import "./styles/Footer.css";
import { useNavigate, useLocation } from "react-router-dom";
import { HomeIcon, ServiceIcon, ReportsIcon, HistoryIcon } from "../components/icons/SystemIcons";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  // FAB state
  const [open, setOpen] = useState(false);
  const fabRef = useRef(null);

  // 바깥 클릭 / ESC 로 닫기
  useEffect(() => {
    const onDoc = (e) => { if (fabRef.current && !fabRef.current.contains(e.target)) setOpen(false); };
    const onEsc  = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  // 퀵 메뉴 항목 (필요 시 추가/수정)
  const items = [
  { label: "Home",    to: "/",        icon: <HomeIcon /> },
  { label: "Service", to: "/files",    icon: <ServiceIcon /> },
  { label: "Reports", to: "/recipes",  icon: <ReportsIcon /> },
  { label: "History", to: "/analyze",  icon: <HistoryIcon /> },
  ];

  const go = (to) => { navigate(to); setOpen(false); };

  return (
    <>
      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-grid">
            <div className="ft-col">
              <h4>Developer</h4>
              <ul>
                <li>DongHwan</li>
                <li>JungJea</li>
                <li>JiNa</li>
              </ul>
            </div>
            <div className="ft-col">
              <h4>Planning</h4>
              <ul><li>JunYong</li></ul>
            </div>
            <div className="ft-col">
              <h4>Infrastructure</h4>
              <ul><li>SungHyun</li></ul>
            </div>
            <div className="ft-col">
              <h4>AI / NLP</h4>
              <ul><li>YongFil</li></ul>
            </div>
            <div className="ft-cta">
              <button className="btn-signup" type="button">SIGN UP</button>
            </div>
          </div>
        </div>
      </footer>

      {/* 뷰포트 고정 Quick FAB */}
      {open && <div className="quick-fab__backdrop" onClick={() => setOpen(false)} />}
      <div className={`quick-fab ${open ? "is-open" : ""}`} ref={fabRef}>
        <button
          type="button"
          className="quick-fab__btn"
          aria-label="Quick menu"
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          <span className="burger" />
        </button>

        {open && (
          <ul className="quick-fab__menu" role="menu" aria-label="빠른 이동">
            {items.map((it) => (
              <li key={it.to} role="none">
                <button
                  type="button"
                  role="menuitem"
                  className={`qitem ${location.pathname === it.to ? "is-active" : ""}`}
                  onClick={() => go(it.to)}
                >
                  <span className="qitem__icon" aria-hidden>{it.icon}</span>
                  <span className="qitem__label">{it.label}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
