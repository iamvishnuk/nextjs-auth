import { getDataFromToken } from '@/helpers/getDataFromToken';
import { connect } from '@/db/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import { ITokenData } from '@/types';
import User from '@/models/userModel';

connect();

export async function GET(request: NextRequest) {
  try {
    const tokenData: ITokenData = await getDataFromToken(request);
    const user = await User.findById(tokenData.id).select('-password');
    return NextResponse.json({ message: 'User found', user }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
