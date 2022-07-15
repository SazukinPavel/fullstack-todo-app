import IUser from "../models/User";

1
export class UserInfo{
    username:string
    id:string
    constructor(user:IUser){
        this.username=user.username
        this.id=user._id.toString()
    }
}