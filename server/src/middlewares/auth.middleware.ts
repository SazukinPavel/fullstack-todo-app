import { NextFunction,Response ,Request} from "express"
import IUser from "../models/User"
import { User } from "../schemas/User.schema"
import { verifyAccessToken } from "../utils"

const authMiddleware = async (req:Request, res:Response, next:NextFunction) => {
	const accessToken = req.headers['authorization']
	if (accessToken) {
		try {
			const decoded = verifyAccessToken(accessToken) as IUser
			console.log(decoded);
            if(decoded===null){
                next()
            }
			console.log(decoded);

			req.user = await User.findById(decoded._id.toString()).select('-password')
		}catch(e){
            console.error(e);
        }
	}
    next()    
}

export { authMiddleware }