import { connect } from '@/db/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(token);

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() }
    });

    console.log(user);

    if (!user) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 400 });
    }

    user.isVerified = true;
    user.verifyToken = '';
    user.verifyTokenExpiry = null;

    await user.save();

    return NextResponse.json(
      {
        status: true,
        message: 'User verified successfully'
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
