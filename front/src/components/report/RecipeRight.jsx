import React, { useMemo } from "react";
import { makeSafeRecipe } from "../../utils/safeRecipe";

export default function RecipeRight({ item }) {
  const safe = useMemo(() => makeSafeRecipe(item), [item]);

  const name = safe.menuName || safe.name || "Food Name";
  const ingredients = Array.isArray(safe.ingredients) ? safe.ingredients : [];

  return (
    <div style={{ display: "grid", gap: 12 }}>
      {/* 메뉴 이름 */}
      <div>
        <div style={{ fontSize: 18, fontWeight: 800, color: "#2b2f36", marginBottom: 6 }}>
          Food Name
        </div>
        <div
          style={{
            minHeight: 28,
            display: "grid", alignItems: "center",
            maxWidth: 300,
            /* ✅ 배경·테두리 제거 */
            background: "transparent", border: "none", padding: 0, borderRadius: 0,
          }}
        >
          {name}
        </div>
      </div>

      {/* 재료 리스트 */}
      <div style={{ display: "grid", gap: 8, marginTop: 6 }}>
        {ingredients.length > 0 ? (
          ingredients.slice(0, 5).map((ing, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "70px 10px 1fr",
                gap: 8,
                alignItems: "center",
              }}
            >
              <span style={{ color: "#666" }}>재료명</span>
              <span style={{ color: "#999" }}>:</span>
              <div
                style={{
                  minHeight: 28,
                  display: "grid", alignItems: "center",
                  /* ✅ 알약(pill) 스타일 제거 */
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  borderRadius: 0,
                  color: "#2b2f36",
                }}
              >
                {ing}
              </div>
            </div>
          ))
        ) : (
          <div style={{ color: "#888" }}>재료 정보 없음</div>
        )}
      </div>
    </div>
  );
}
