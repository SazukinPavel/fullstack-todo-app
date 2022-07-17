import {Types } from 'mongoose';

export default interface ITodo {
    title: string
    _id:Types.ObjectId
    expiresIn:number
    refreshToken:string,
    userId:Types.ObjectId
}