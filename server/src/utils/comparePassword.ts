import { compare } from "bcryptjs";
import IUser from "../models/User";

export async function comparePassword(entredPassword:string,user:IUser){
    return await compare(entredPassword,user.password)
}