import { compare } from 'bcryptjs';
import { Response } from 'express';
import { sign } from 'jsonwebtoken';
import 'reflect-metadata';
import { Body, Controller,HttpError,Post, Res } from 'routing-controllers';
import IUser from '../models/User';
import { User } from '../schemas/User.schema';
import { AuthDto } from './dto/Auth.dto';
import { env } from 'process';

@Controller('/auth/')
export class AuthController {
    
    @Post('register')
    async register(@Body() authDto:AuthDto,@Res() res:Response){
        const userWithSameName=await User.findOne({username:authDto.username})
        if(userWithSameName){
            return new HttpError(400,'User with same name alredy exists')
        }
        const user=new User({...authDto})
        await user.save()
        res.cookie('auth',this.signToken(user))
        return 'sucess'
    }

    @Post('login')
    async login(@Body() {username,password}:AuthDto,@Res() res:Response){
        const user=await User.findOne({username})
        if(!user){
            return new HttpError(400,'No user with this username')
        }
        const isPasswordEqual=await compare(password,user.password)
        if(!isPasswordEqual){
            return new HttpError(400,'Wrong password')
        }
        res.cookie('auth',this.signToken(user))
        return 'sucess'
    }

    private signToken(user:IUser){
        return sign({id:user.id},parseInt(env.JWT_KEY).toString())
    }
}