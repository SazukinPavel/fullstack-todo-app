import IUser from "../models/User";

export default class UserInfo{
    username:string
    id:string
    constructor(user:IUser){
        this.username=user.username
        this.id=user._id.toString()
    }
}