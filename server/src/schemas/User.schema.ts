import { model, Schema, Types } from "mongoose";
import IUser from "../models/User";
import {hash} from 'bcryptjs'
import { env } from "process";

export const UserSchema=new Schema<IUser>({
    username:{type:String,required:true},
    password:{type:String,required:true},
    id:Types.ObjectId,
    todos:[{
        type:Types.ObjectId,
        ref:'Todos'
    }]
})

UserSchema.pre('save',async function(next){
    const user=this
    user.password=await hash(user.password,parseInt(env.SALT))
    next()
})

export const User = model<IUser>('Users', UserSchema);