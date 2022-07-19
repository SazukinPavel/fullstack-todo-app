import {Schema,model} from "mongoose";
import IRefreshSession from "../models/RefreshSession";
 
const refreshSessionSchema = new Schema<IRefreshSession>({
  user:{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required:true
  },
  expiresIn:{
    type:Schema.Types.Date,
    default:new Date(new Date().getTime()+(30*24*60*60*1000))
  },
  refreshToken:{
    type:Schema.Types.String,
    required:true
  }
});
 
const RefreshSession = model<IRefreshSession>('RefreshSession', refreshSessionSchema);
 
export default RefreshSession;