import { model, Schema} from "mongoose";
import IUser from "../models/User";
import { hash} from 'bcryptjs'
import { env } from "process";

const UserSchema=new Schema<IUser>({
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},
})


UserSchema.pre('save',async function(next){
    const user=this
    user.password=await hash(user.password,parseInt(env.SALT))
    next()
})

export const User = model<IUser>('User', UserSchema);