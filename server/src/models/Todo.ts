import { ObjectId } from "mongoose"
import IUser from "./User"

export default interface ITodo{
    id:string,
    title:string,
    description:string,
    completed:boolean
    owner:IUser | ObjectId
}