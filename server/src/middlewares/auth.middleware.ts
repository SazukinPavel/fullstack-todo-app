import { NextFunction,Response ,Request} from "express"
import { User } from "../schemas/User.schema"
import { JwtUser } from "../types/JwtUser"
import { verifyAccessToken } from "../utils"

const authMiddleware = async (req:Request, res:Response, next:NextFunction) => {
	const accessToken = req.headers['authorization']
	if (accessToken) {
		try {
			const decoded = verifyAccessToken(accessToken) as JwtUser
            if(decoded===null){
                next()
            }
			req.user = await User.findById(decoded.id).select('-password')
		}catch(e){
            console.error(e);
        }
	}
    next()    
}

export { authMiddleware }