import { Request, Response } from 'express';
import 'reflect-metadata';
import { Body, CurrentUser, Get, HttpCode, HttpError, JsonController, Post, Req, Res } from 'routing-controllers';
import IUser from '../models/User';
import { User } from '../schemas/User.schema';
import { UserInfo } from '../types/UserInfo';
import { comparePassword, createLoginCookie, createLogoutCookie, generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils';
import { AuthDto } from './dto/Auth.dto';

@JsonController('auth/')
export class AuthController {

    @HttpCode(201)
    @Post('register')
    async register(@Body() { username, password }: AuthDto, @Res() res: Response) {
        const userWithSameName = await User.findOne({ username })
        if (userWithSameName) {
            return new HttpError(400, 'Пользователь с таким именем уже существует')
        }
        const user = new User({ password, username })
        await user.save()
        return this.getAuthorizeResponse(user, res)
    }

    @HttpCode(201)
    @Post('login')
    async login(@Body() { username, password }: AuthDto, @Res() res: Response) {
        const user = await User.findOne({ username })
        if (!user) {
            return new HttpError(400, 'Не существует пользователя с таким именем')
        }
        if (!await comparePassword(password, user)) {
            return new HttpError(400, 'Неправильный пароль')
        }
        return this.getAuthorizeResponse(user, res)
    }

    @HttpCode(200)
    @Get('login/acess-token')
    async getAcessToken(@Req() req: Request) {
        const rfToken = req.cookies.token
        if (!rfToken) {
            return new HttpError(403, 'Требуется авторизация')
        }
        const result = verifyRefreshToken(rfToken) as IUser
        if (!result) {
            return new HttpError(403, 'Неправильный токен, переавторизуйтесь')
        }
        const user = await User.findById(result._id)
        if (!user) {
            return new HttpError(403, 'Такого пользвателя нет')
        }
        const accessToken = generateAccessToken(user.id)
        return { user: new UserInfo(user), accessToken, }
    }

    @HttpCode(200)
    @Get('logout')
    logout(@Res() res: Response) {
        createLogoutCookie(res)
    }

    @HttpCode(200)
    @Get('user')
    getUser(@CurrentUser({ required: true }) user: IUser) {
        return user
    }

    private getAuthorizeResponse(user: IUser, res: Response) {
        const [acessToken, refreshToken] = [generateAccessToken(user._id.toString()), generateRefreshToken(user._id.toString())]
        createLoginCookie(res, refreshToken)
        return { user: new UserInfo(user), acessToken }
    }
}