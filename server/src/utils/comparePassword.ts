import { compare } from "bcryptjs";
import IUser from "../models/User";

export function comparePassword(entredPassword:string,user:IUser){
    return compare(entredPassword,user.password)
}