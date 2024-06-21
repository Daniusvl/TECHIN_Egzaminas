import axios from "axios";
import Cookies from "universal-cookie";

const CFG_URL = process.env.REACT_APP_SERVER_URL;

export const BASE_URL = `${CFG_URL}${CFG_URL.endsWith("/") ? "" : "/"}`;

const BASE_API_URL = `${BASE_URL }api`;

export const modelResponse = (status, data) => {
    return [status, data];
};

export const apiClient = axios.create({
    baseURL: BASE_API_URL
});

apiClient.interceptors.request.use(function (config) {

    const cookies = new Cookies();

    const token = cookies.get("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});