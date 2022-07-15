import { NextFunction,Response ,Request} from "express"
import IUser from "../models/User"
import { User } from "../schemas/User.schema"
import { verifyRefreshToken } from "../utils"

const checkAuthMiddleware = async (req:Request, res:Response, next:NextFunction) => {
	const refreshToken = req.cookies.token
	if (refreshToken) {
		try {
			const decoded = verifyRefreshToken(refreshToken) as IUser
			req.body.user = await User.findById(decoded.id).select('-password')
			next()
		} catch (error) {
			console.error(error)
			res.status(401).json('Not authorize').send()
		}
	}
	res.status(401).json('Not authorize').send()
}

export { checkAuthMiddleware }