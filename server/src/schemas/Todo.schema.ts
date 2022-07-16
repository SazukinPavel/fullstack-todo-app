import {Schema,model} from "mongoose";
import ITodo from "../models/Todo";
 
const todoSchema = new Schema<ITodo>({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {type:String,required:true},
  description: {type:String,required:true},
  completed:{type:Boolean,default:false}
});
 
const Todo = model<ITodo>('Todo', todoSchema);
 
export default Todo;