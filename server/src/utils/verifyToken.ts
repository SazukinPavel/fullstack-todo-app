import { verify } from "jsonwebtoken"
import { env } from "process"

export const verifyRefreshToken=(token:string)=>{
    return verify(token, env.JWT_REFRESH_KEY)
}

export const verifyAccessToken=(token:string)=>{
    return verify(token, env.JWT_ACCESS_KEY)
}