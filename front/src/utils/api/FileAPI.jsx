import WSIE_API from "./BasicAPI";

export const Utils = {
    file_upload: async (file) => {
    const form = new FormData();
    form.append("file", file);

    try {
      const { data } = await WSIE_API.post("/api/analyze-graph", form, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 60_000,
      });
      return data;
    } catch (err) {
      console.error("graph_analyze error:", err?.message || err);
      throw err;
    }
  },
}