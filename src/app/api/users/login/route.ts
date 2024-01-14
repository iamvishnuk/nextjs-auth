import { connect } from '@/db/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, passowrd } = reqBody;
    const jwtSecretKey = process.env.JWT_SECRET_KEY;

    // check user exist or not
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: 'There is not user exist in this email' },
        { status: 400 }
      );
    }

    // compare the password
    const validatePassword = bcryptjs.compare(passowrd, user.password);
    if (!validatePassword) {
      return NextResponse.json(
        { message: 'Invalid password' },
        { status: 400 }
      );
    }

    // create token data
    const tokenData = {
      id: user._id,
      email: user.email,
      userName: user.userName
    };

    // create token
    const token = await jwt.sign(tokenData, jwtSecretKey!, {
      expiresIn: '1hr'
    });

    const response = NextResponse.json(
      {
        message: 'Logged in successfully',
        success: true
      },
      { status: 200 }
    );
    response.cookies.set('token', token, { httpOnly: true });
    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
