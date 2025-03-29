import { AppError } from "@utils/AppError";
import axios from "axios"; // npm install axios em https://axios-http.com/docs/intro

const api = axios.create({
    // encontrei o ip com o comando ifconfig
    // 3333 é porta que roda o backend (api)
    baseURL: 'http://172.24.170.91:3333'
});

api.interceptors.response.use(response => response, error => {
    if(error.response && error.response.data) {
        // Erro tratado
        return Promise.reject(new AppError(error.response.data.message));
    } else {
        // Erro não tratado
        return Promise.reject(error);
    }
});

export { api };