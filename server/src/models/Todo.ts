import {Types } from 'mongoose';

export default interface IUser {
  title: string
  description: string
  completed:boolean
  _id:Types.ObjectId
  owner:Types.ObjectId
}