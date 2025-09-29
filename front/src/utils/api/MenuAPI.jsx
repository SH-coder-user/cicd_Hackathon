import WSIE_API from "./BasicAPI"

export const Menus = {
    list: (type, limit = 20, cursor = null ) => {
        const _limit = Number.isFinite(limit) ? Math.min(Math.max(limit, 1), 100) : 20;

        const params = { limit: _limit };
        if (type != null && type !== "") params.type = type;
        if (cursor != null && cursor !== "") params.cursor = cursor;

        return WSIE_API.get("/api/menus", { params })
            .then(({ data }) => {
            const items = Array.isArray(data?.items) ? data.items : [];
            const nextCursor = data?.nextCursor || null;
            return { items, nextCursor };
            });
    },

    recommand: (req) => {
        console.log("응답객체: ", req);
        return WSIE_API.post("/api/menus/recommand")
            .then(({data}) => data);
    },

    detail: (id) => {
        return WSIE_API.get(`/api/menus/${id}`)
            .then(({ data }) => {
                console.log("디테일: ", data)
                return data;
            })
    },

    delete: (id) => {
        return WSIE_API.delete(`/api/menus/${id}`)
            .then(({data}) => {
                console.log("삭제 데이터", data)
                return data;
            })
    }
}
