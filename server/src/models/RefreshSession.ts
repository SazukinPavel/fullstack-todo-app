import {Types } from 'mongoose';
import IUser from './User';

export default interface IRefreshSession {
    _id:Types.ObjectId
    expiresIn:Date
    refreshToken:string
    user:Types.ObjectId | IUser 
}