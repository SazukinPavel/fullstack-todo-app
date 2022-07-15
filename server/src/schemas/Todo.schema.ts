import { model, Schema} from "mongoose";
import ITodo from '../models/Todo'
import { User } from "./User.schema";

export const TodoSchema=new Schema<ITodo>({
    title:{type:String,required:true},
    description:{type:String,required:true},
    completed:{type:Boolean,default:false},
    owner:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
})

export const Todo = model<ITodo>('Todo', TodoSchema);