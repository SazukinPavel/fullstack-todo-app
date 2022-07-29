import { sign } from "jsonwebtoken"
import { env } from "process"
import IUser from "../models/User"
import RefreshSession from "../schemas/RefreshToken.schema"

export const generateRefreshToken=async(user:IUser)=>{
    await RefreshSession.deleteMany({user})
    const refreshSession=new RefreshSession({user})
    const refreshToken=sign({id:refreshSession._id},env.JWT_REFRESH_KEY,{expiresIn:'1m'})
    refreshSession.refreshToken=refreshToken
    await refreshSession.save()
    return refreshToken
}

export const generateAccessToken=(id:string)=>{
    return sign({id},env.JWT_ACCESS_KEY,{expiresIn:'1m'})
}