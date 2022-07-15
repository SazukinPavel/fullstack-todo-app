import { Request, Response } from 'express';
import 'reflect-metadata';
import { Body, Controller,Get,HttpError,Post, Req, Res } from 'routing-controllers';
import IUser from '../models/User';
import { User } from '../schemas/User.schema';
import { UserInfo } from '../types/UserInfo';
import { comparePassword, createLoginCookie, generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils';
import { AuthDto } from './dto/Auth.dto';

@Controller('/api/auth/')
export class AuthController {
    
    @Post('register')
    async register(@Body() {username,password}:AuthDto,@Res() res:Response){
        const userWithSameName=await User.findOne({username})
        if(userWithSameName){
            return new HttpError(400,'User with same name alredy exists')
        }
        const user=new User({password,username})
        await user.save()
        const [acessToken,refreshToken]=[generateAccessToken(user._id.toString()),generateRefreshToken(user._id.toString())]
        createLoginCookie(res,refreshToken)
        return {user:new UserInfo(user),acessToken}
    }

    @Post('login')
    async login(@Body() {username,password}:AuthDto,@Res() res:Response){
        const user=await User.findOne({username})
        if(!user){
            return new HttpError(400,'No user with this username')
        }
        if(await comparePassword(password,user)){
            return new HttpError(400,'Wrong password')
        }
        const [acessToken,refreshToken]=[generateAccessToken(user._id.toString()),generateRefreshToken(user._id.toString())]
        createLoginCookie(res,refreshToken)
        return {user:new UserInfo(user),acessToken}
    }

    @Get('login/acess-token')
    async getAcessToken(@Req() req:Request){
        const rfToken = req.cookies.token
		if (!rfToken) {
			return new HttpError(400,'Please login in app!')
		}
		const result = verifyRefreshToken(rfToken) as IUser
		if(!result) {
            return new HttpError(400,'Wrong token, please relogin in app')
		}
		const user = await User.findById(result.id)
		if (!user) {
            return new HttpError(400,'User not found!')
		}
		const accessToken = generateAccessToken(user.id)
		return{user:new UserInfo(user),accessToken,}
    }
}