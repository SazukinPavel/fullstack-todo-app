import { NextFunction, Request, Response } from 'express';
import { ExpressMiddlewareInterface, ForbiddenError } from 'routing-controllers';
import { User } from '../schemas/User.schema';
import { JwtUser } from '../types/JwtUser';
import { verifyAccessToken } from '../utils';

export class AuthMiddleware implements ExpressMiddlewareInterface {

	async use(request: Request, response: Response, next?: NextFunction) {
		const accessToken = request.headers['authorization']
		if (accessToken) {
			try {
				const decoded = verifyAccessToken(accessToken) as JwtUser
				request.user = await User.findById(decoded.id).select('-password')
				next()
			} catch { }
		}
		if (!request.user) {
			response.status(403).json(new ForbiddenError('Вы не авторизованы'))
		}
	}
}
