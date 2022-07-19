import { store } from "@/store";
import axios from "axios";

const myAxios = axios.create({
    baseURL: 'http://localhost:4200/api',
    withCredentials: true
})

myAxios.interceptors.request.use((config) => {
    const token = store.getters.accessToken
    if (token) {
        config.headers.Authorization = token
    }
    return config
})

export default myAxios