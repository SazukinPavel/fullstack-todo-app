import {Types } from 'mongoose';
import IUser from './User';

export default interface ITodo {
  title: string
  description: string
  completed:boolean
  owner:IUser | Types.ObjectId
  _id:Types.ObjectId
}