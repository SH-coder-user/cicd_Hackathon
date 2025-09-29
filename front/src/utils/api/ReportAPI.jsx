import WSIE_API from "./BasicAPI"

export const Reports = {
  getReport: (params) =>
    WSIE_API
        .get("/api/reports/summary", { params })
        .then(({ data }) => data),
}
