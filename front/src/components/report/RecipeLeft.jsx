import React, { useMemo } from "react";
import hero from "../../assets/hero.jpg";
import { makeSafeRecipe } from "../../utils/safeRecipe";

function clamp01(n) { return Math.max(0, Math.min(100, Math.round(n))); }

export default function RecipeLeft({ item }) {
  // ✅ item을 안전하게 정제 (없으면 더미로 대체 + 콘솔 경고)
  const safe = useMemo(() => makeSafeRecipe(item), [item]);

  const { estimatedCost, price, margin, tips } = safe;

  const { costSaveRate, marginRate } = useMemo(() => {
    const p = Number(price);
    const est = Number(estimatedCost);
    const mar = Number(margin ?? (p - est));

    const costSave =
      p > 0 && Number.isFinite(p) && Number.isFinite(est)
        ? clamp01(((p - est) / p) * 100)
        : null;

    const mRate =
      p > 0 && Number.isFinite(p) && Number.isFinite(mar)
        ? clamp01((mar / p) * 100)
        : null;

    return { costSaveRate: costSave, marginRate: mRate };
  }, [estimatedCost, price, margin]);

  return (
    <div>
      {/* 고정 이미지 */}
      <div
        style={{
          width: "100%",
          aspectRatio: "4/3",
          borderRadius: 12,
          overflow: "hidden",
          border: "1px solid #e5e7eb",
          marginBottom: 12,
        }}
      >
        <img
          src={hero}
          alt="recipe"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* 기대 효과 */}
      <div style={{ marginTop: 12 }}>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>기대 효과</div>

        {costSaveRate != null && (
          <ProgressRow label="원가절감율" value={costSaveRate} />
        )}
        {marginRate != null && (
          <ProgressRow label="마진개선율" value={marginRate} />
        )}
      </div>

      {/* 하단 안내/팁 */}
      {safe.tips && (
        <div
          style={{
            marginTop: 12,
            background: "#f8fafb",
            border: "1px dashed #d9dee5",
            borderRadius: 10,
            padding: 10,
            fontSize: 13,
            color: "#44515e",
          }}
        >
          💡 {safe.tips}
        </div>
      )}
    </div>
  );
}

function ProgressRow({ label, value }) {
  const v = clamp01(value);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "110px 1fr 60px",
        gap: 10,
        alignItems: "center",
        marginBottom: 10,
      }}
    >
      <span style={{ color: "#444" }}>{label}</span>
      <div
        style={{
          height: 28,
          background: "#eef1f5",
          borderRadius: 8,
          overflow: "hidden",
          border: "1px solid #e2e6ea",
        }}
      >
        <div style={{ height: "100%", width: `${v}%`, background: "#cfd8e3" }} />
      </div>
      <span style={{ textAlign: "right", color: "#444" }}>{v}%</span>
    </div>
  );
}
