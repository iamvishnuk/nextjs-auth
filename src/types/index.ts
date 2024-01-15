import { ObjectId } from 'mongoose';

export interface IUser {
  userName: string;
  password: string;
  email: string;
  isVerified: boolean;
  isAdmin: boolean;
  forgotPasswordToken: string;
  forgotPasswordTokenExpiry: Date;
  verifyToken: string;
  verifyTokenExpiry: Date;
}

export interface ITokenData {
  id: ObjectId;
  userName: string;
  email: string;
}
