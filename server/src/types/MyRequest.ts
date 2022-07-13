import { Request as ExpressRequest} from "express";
import IUser from "../models/User";

export interface Request extends ExpressRequest{
    user:IUser | null
}
