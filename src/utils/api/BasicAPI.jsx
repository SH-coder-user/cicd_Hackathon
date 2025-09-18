import axios from "axios";

const WISE_API = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    timeout: 10000,
})

WISE_API.interceptors.request.use((config) => {
    const isFormData = config.data instanceof FormData;

    if (isFormData) {
    // Axios가 boundary까지 알아서 붙여주니 그냥 Content-Type만 제거
    delete config.headers["Content-Type"];
    } else {
        config.headers["Content-Type"] = "application/json";
    }
    return config;
})

export default WISE_API;