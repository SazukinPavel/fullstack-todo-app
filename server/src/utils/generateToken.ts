import { sign } from "jsonwebtoken"
import { env } from "process"

export const generateRefreshToken=(id:string)=>{
    return sign({id},env.JWT_REFRESH_KEY,{expiresIn:'30d'})
}

export const generateAccessToken=(id:string)=>{
    return sign({id},env.JWT_ACCESS_KEY,{expiresIn:'1m'})
}