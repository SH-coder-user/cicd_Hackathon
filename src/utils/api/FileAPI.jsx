import WISE_API from "./BasicAPI";

export const Utils = {
    file_upload: async(file) =>  {
        const formData = new FormData();
        formData.append("file", file);
        return WISE_API.post(`/api/analyze`, formData)
            .then((res) => {
                console.log('성공', res.data);
                return res.data;
            })
            .catch((err) => {
                console.error('에러 발생', err);
                return {};
            })
    }
} 