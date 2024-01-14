import { IUser } from '@/types';
import mongoose, { Document } from 'mongoose';

type UserDocument = IUser & Document;
const UserSchema = new mongoose.Schema<UserDocument>({
  userName: {
    type: String,
    required: [true, 'Please enter the Username']
  },
  email: {
    type: String,
    required: [true, 'Please enter the email'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please enter the password']
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  forgotPasswordToken: {
    type: String
  },
  forgotPasswordTokenExpiry: {
    type: Date
  },
  verifyToken: {
    type: String
  },
  verifyTokenExpiry: {
    type: Date
  }
});

const User =
  (mongoose.models.User as mongoose.Model<UserDocument>) ||
  mongoose.model<UserDocument>('User', UserSchema);

export default User;
