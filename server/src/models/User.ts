import {Types } from 'mongoose';

export default interface IUser {
  password: string;
  username: string;
  _id:Types.ObjectId
}