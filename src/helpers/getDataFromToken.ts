import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { ITokenData } from '@/types';

export const getDataFromToken = (request: NextRequest): ITokenData => {
  try {
    const token = request.cookies.get('token')?.value || '';
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    return decodeToken as ITokenData;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
