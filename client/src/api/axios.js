import AuthService from "@/services/AuthServce";
import { store } from "@/store";
import axios from "axios";
import jwtDecode from "jwt-decode";

const myAxios = axios.create({
    baseURL: 'http://localhost:4200/api',
    withCredentials: true
})

myAxios.interceptors.request.use(async(config) => {
    let token = store.getters.accessToken
    if(token){
        let decodedToken = jwtDecode(token);
        let currentDate = new Date();
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            const authorizeInfo=await AuthService.getAuthorizeInfo()
            store.commit('authUser',authorizeInfo)
            token=authorizeInfo.accessToken
        }
        config.headers.Authorization = token
    }
    return config
})



export default myAxios