import { Request, Response } from 'express';
import 'reflect-metadata';
import { BadRequestError, Body, CurrentUser, ForbiddenError, Get, HttpCode, JsonController, Post, Req, Res, UseBefore } from 'routing-controllers';
import { AuthMiddleware } from '../middlewares';
import { IRefreshSession, IUser} from '../models';
import { RefreshSession, User } from '../schemas';
import { JwtRefreshSession, UserInfo } from '../types';
import { comparePassword, createLoginCookie, createLogoutCookie, generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils';
import { AuthDto } from './dto/Auth.dto';

@JsonController('auth/')
export class AuthController {

    @HttpCode(201)
    @Post('register')
    async register(@Body() { username, password }: AuthDto, @Res() res: Response) {
        const userWithSameName = await User.findOne({ username })
        if (userWithSameName) {
            throw new BadRequestError('Пользователь с таким именем уже существует')
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
            throw new BadRequestError('Не существует пользователя с таким именем')
        }
        if (!await comparePassword(password, user)) {
            throw new BadRequestError('Неправильный пароль')
        }
        return this.getAuthorizeResponse(user, res)
    }

    @HttpCode(200)
    @Get('acess-token')
    async getAcessToken(@Req() req: Request) {
        const rfToken = req.cookies?.token
        if (!rfToken) {
            throw new ForbiddenError('Требуется авторизация')
        }
        let result:JwtRefreshSession | undefined;
        try{
            result = verifyRefreshToken(rfToken) as JwtRefreshSession
        }catch{
            throw new ForbiddenError('Токен истёк, переавторизуйтесь')
        }
        if (!result) {
            throw new ForbiddenError('Неправильный токен, переавторизуйтесь')
        }
        const refreshSession:IRefreshSession=await RefreshSession.findById(result.id)
        if(!refreshSession){
            throw new ForbiddenError('Токен истёк, переавторизуйтесь')
        }
        const user = await User.findById(refreshSession.user)
        if (!user) {
            throw new ForbiddenError('Такого пользователя нет')
        }
        const accessToken = generateAccessToken(user.id)
        return { user: new UserInfo(user), accessToken, }
    }

    @HttpCode(200)
    @Get('logout')
    logout(@Res() res: Response) {
        createLogoutCookie(res)
        return true
    }

    @HttpCode(200)
    @Get('user')
    @UseBefore(AuthMiddleware)
    getUser(@CurrentUser({ required: true }) user: IUser) {
        return user
    }

    private async getAuthorizeResponse(user: IUser, res: Response) {
        const [accessToken, refreshToken] = [generateAccessToken(user._id.toString()),await generateRefreshToken(user)]
        createLoginCookie(res, refreshToken)
        return { user: new UserInfo(user), accessToken }
    }
}