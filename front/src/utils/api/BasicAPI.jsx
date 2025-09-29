import axios from "axios";

const WSIE_API = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    headers: {"Content-Type": "application/json"},
    timeout: 10000,
});

WSIE_API.interceptors.request.use((config) => {
    const isFormData = config.data instanceof FormData;

    if (isFormData) {
    delete config.headers["Content-Type"];
    } else {
        config.headers["Content-Type"] = "application/json";
    }
    return config;
})

export default WSIE_API;