// src/pages/recipe/Recipe.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RecipeAPI } from "../../utils/api/RecipeAPI";
import LeftPanel from "../../components/report/RecipeLeft";
import RightPanel from "../../components/report/RecipeRight";
import RecipeFooter from "../../components/buttons/RecipeFooter";

export default function Recipe({ req = {} }) {
  const nav = useNavigate();
  const { state } = useLocation();
  const menusFromState = state?.menus;

  const [menus, setMenus] = useState(Array.isArray(menusFromState) ? menusFromState : []);
  const [idx, setIdx] = useState(0);
  const [loading, setLoading] = useState(false);

  // 1) state에 없으면 세션에서 복구
  useEffect(() => {
    if (menus.length) return;
    const raw = sessionStorage.getItem("recommendedMenus");
    if (raw) {
      try {
        const cached = JSON.parse(raw);
        if (Array.isArray(cached) && cached.length) {
          setMenus(cached);
          setIdx(0);
          return;
        }
      } catch {}
    }
  }, [menus.length]);

  // 2) 여전히 없고 req가 있다면 기존 API로 초기화 (옵션)
  const hasReq = useMemo(() => req && Object.keys(req).length > 0, [req]);
  useEffect(() => {
    if (menus.length || !hasReq) return;
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const data = await RecipeAPI.fetchText(req);
        if (!alive) return;
        if (Array.isArray(data) && data.length) {
          setMenus(data);
          setIdx(0);
        } else {
          setMenus([{
            menuName: "추천 레시피를 불러올 수 없습니다.",
            ingredients: [],
            tips: "(임시 더미 데이터)",
            estimatedCost: 0, price: 0, margin: 0,
          }]);
          setIdx(0);
        }
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [menus.length, hasReq, JSON.stringify(req)]);

  const handleHome = () => nav("/");

  const current = menus[idx] ?? {};
  if (loading) return <div>loading…</div>;

  return (
    <section style={{ maxWidth: 1080, margin: "0 auto", padding: 24 }}>
      <h2 style={{ textAlign: "center", marginBottom: 16, letterSpacing: 2 }}>추천 레시피</h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "start" }}>
        <div style={{ border: "1px solid #eee", borderRadius: 12, overflow: "hidden", padding: 16, background: "#fff" }}>
          <LeftPanel item={current} />
        </div>
        <div style={{ border: "1px solid #eee", borderRadius: 12, overflow: "hidden", padding: 16, background: "#fffaf5" }}>
          <RightPanel item={current} />
        </div>
      </div>

      <RecipeFooter page={idx + 1} total={menus.length} onHome={handleHome} />
    </section>
  );
}
