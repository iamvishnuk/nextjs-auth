import { ObjectId } from 'mongoose';

export interface IUser {
  userName: string;
  password: string;
  email: string;
  isVerified: boolean;
  isAdmin: boolean;
  forgotPasswordToken: string;
  forgotPasswordTokenExpiry: Date | null;
  verifyToken: string;
  verifyTokenExpiry: Date | null;
}

export interface ITokenData {
  id: ObjectId;
  userName: string;
  email: string;
}

export enum EmailTypes {
  VERIFY = 'verifyToken',
  FORGOTPASSWORD = 'forgotPassword'
}

export interface ISendEmail {
  email: string;
  emailType: EmailTypes;
  userId: ObjectId;
}
