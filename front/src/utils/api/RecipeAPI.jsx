import WSIE_API from "./BasicAPI";

export const RecipeAPI = {
  fetchText: async (req) => {
    try {
      const res = await WSIE_API.post("/api/recommend/by-ingredients", req);
      return res.data;  // 정상 응답
    } catch (err) {
      console.error("RecipeAPI error:", err.message || err); 
      return null;      // 실패 시 null 반환
    }
  },
};

export default RecipeAPI;

