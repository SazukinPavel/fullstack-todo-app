import axios from "@/api/axios";

export default class AuthService {
    static async login(loginDto) {
        try {
            return (await axios.post('/auth/login',loginDto)).data
        } catch (e) {
            console.log(`some error with fetch todo((( Error:${e}`);
        }
    }

    static async register(registerDto){
        try {
            console.log(registerDto);
            return (await axios.post('/auth/register',registerDto)).data
        } catch (e) {
            console.log(`some error with fetch todo((( Error:${e}`);
        }
    }
}