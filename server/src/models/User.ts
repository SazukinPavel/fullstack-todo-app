import { ObjectId } from "mongoose"
import ITodo from "./Todo"

export default interface IUser{
    username:string
    password:string
    id:string,
    todos:ITodo[] | ObjectId[]
}