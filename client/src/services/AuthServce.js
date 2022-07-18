import axios from "@/api/axios";

export default class AuthService {
    static async login(loginDto) {
        try {
            return (await axios.post('/auth/login',loginDto)).data
        } catch (e) {
            console.log(`some error with login((( Error:${e}`);
        }
    }

    static async register(registerDto){
        try {
            return (await axios.post('/auth/register',registerDto)).data
        } catch (e) {
            console.log(`some error with register((( Error:${e}`);
        }
    }

    static async getAuthorizeInfo(){
        try {
            return (await axios.get('auth/acess-token')).data
        } catch (e) {
            console.log(`some error with authorize((( Error:${e}`);
        }
    }

    static async logout(){
        try {
            await axios.get('auth/logout')
            return true
        } catch (e) {
            console.log(`some error with logout((( Error:${e}`);
        }
    }
}