import { model, Schema, Types } from "mongoose";
import ITodo from '../models/Todo'

export const TodoSchema=new Schema<ITodo>({
    title:{type:String,required:true},
    description:{type:String,required:true},
    completed:{type:Boolean,default:false},
    id:Types.ObjectId
})

export const Todo = model<ITodo>('Todos', TodoSchema);