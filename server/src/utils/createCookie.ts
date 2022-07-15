import { Response } from "express";

export const createLoginCookie=(res:Response,refreshToken:string)=>{
    res.cookie('token',refreshToken,{
        httpOnly:true,
        secure:false,
        path:'/api',
        expires: new Date(Date.now() + 60 * 60 * 24 * 30 * 1000),
	})
}

export const createLogoutCookie=(res:Response)=>{
    res.cookie('token','',{
        httpOnly:true,
        expires:new Date(0),
        path:'/api'
    })
}
