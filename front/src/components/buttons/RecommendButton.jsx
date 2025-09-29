// src/components/recipe/RecommendAction.jsx
import React, { useState } from "react";
import { StockAPI } from "../../utils/api/StockAPI";
import { RecipeAPI } from "../../utils/api/RecipeAPI";

export default function RecommendAction({ onSuccess, days = 3, limit = 20 }) {
  const [loading, setLoading] = useState(false);

  // Firestore 날짜 문자열 → 남은 일수 계산
  const daysLeftFromISO = (iso) => {
    if (!iso) return null;
    const d = new Date(iso);
    const today = new Date();
    const diff = Math.ceil((d - new Date(today.getFullYear(), today.getMonth(), today.getDate())) / 86400000);
    return isNaN(diff) ? null : diff;
  };

  // 재고 문서 맵을 추천 API 페이로드로 정규화
  const normalize = (doc) => {
    const name = doc.name ?? doc.stock_name ?? doc.itemName ?? "";
    const quantity = Number(doc.quantity ?? doc.stock_qty ?? 0);
    const daysLeft =
      doc.daysLeft ??
      daysLeftFromISO(doc.stock_expiration_date ?? doc.expirationDate ?? doc.bestBefore);
    return { name, quantity, daysLeft };
  };

  const handleClick = async () => {
    if (loading) return;
    setLoading(true);
    try {
      // 1) 임박 재고 조회
      const { items } = await StockAPI.expiring({ days, limit });

      // 2) 추천 API 호출 (정규화된 페이로드)
      const payload = items.map(normalize).filter(x => x.name);
      const list = await RecipeAPI.recommendByStock(payload, 3);

      if (typeof onSuccess === "function") onSuccess(Array.isArray(list) ? list : []);
    } catch (e) {
      console.error("추천 레시피 요청 실패", e);
      alert("추천 레시피 요청 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="btn-primary"
    >
      {loading ? "추천 불러오는 중…" : "추천 레시피 보기"}
    </button>
  );
}
