// src/utils/api/StockAPI.js
import WSIE_API from "./BasicAPI";

export const StockAPI = {
  /**
   * 임박 재고 조회
   * @param {object} opts { days=3, limit=20, cursor=null }
   * @returns {Promise<{items:any[], nextCursor:string|null}>}
   */
  expiring: async (opts = {}) => {
    const { days = 3, limit = 20, cursor } = opts;
    const params = { days, limit };
    if (cursor) params.cursor = cursor;

    const { data } = await WSIE_API.get("/api/stocks/expiring", { params });
    // 백엔드가 {items: [...], nextCursor: "..."} 형태로 내려줌
    const items = Array.isArray(data?.items) ? data.items : [];
    const nextCursor = data?.nextCursor ?? null;
    return { items, nextCursor };
  },
};

export default StockAPI;
