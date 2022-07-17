import { Request, Response } from 'express';
import 'reflect-metadata';
import { BadRequestError, Body, Controller, CurrentUser, ForbiddenError, Get, HttpCode, Post, Req, Res, UseBefore} from 'routing-controllers';
import { AuthMiddleware } from '../middlewares';
import IUser from '../models/User';
import { User } from '../schemas/User.schema';
import { JwtUser } from '../types/JwtUser';
import { UserInfo } from '../types/UserInfo';
import { comparePassword, createLoginCookie, createLogoutCookie, generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils';
import { AuthDto } from './dto/Auth.dto';

@Controller('auth/')
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
        const result = verifyRefreshToken(rfToken) as JwtUser
        if (!result) {
            throw new ForbiddenError('Неправильный токен, переавторизуйтесь')
        }
        const user = await User.findById(result.id)
        if (!user) {
            throw new ForbiddenError('Такого пользвателя нет')
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
    @UseBefore(AuthMiddleware)
    getUser(@CurrentUser({ required: true }) user: IUser) {
        return user
    }

    private getAuthorizeResponse(user: IUser, res: Response) {
        const [acessToken, refreshToken] = [generateAccessToken(user._id.toString()), generateRefreshToken(user._id.toString())]
        createLoginCookie(res, refreshToken)
        return { user: new UserInfo(user), acessToken }
    }
}