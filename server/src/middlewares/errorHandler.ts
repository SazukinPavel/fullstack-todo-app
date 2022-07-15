import { NextFunction,Request,Response } from 'express'
import { HttpError } from 'routing-controllers'
import { ProductionType } from '../types/ProductionType'

const errorHandlerMiddleware = (err:HttpError, req:Request, res:Response, next:NextFunction) => {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode
	res.status(statusCode)
	res.json({
		message: err.message,
		stack: process.env.NODE_ENV ===  ProductionType.PRODUCTION? null : err.stack,
	})
}

export { errorHandlerMiddleware}
