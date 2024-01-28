import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import { ISendEmail, EmailTypes } from '@/types';

export const sendEmail = async ({ email, emailType, userId }: ISendEmail) => {
  try {
    // create a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    const currentDate = new Date();

    if (emailType === EmailTypes.VERIFY) {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: new Date(
          currentDate.getTime() + 3 * 24 * 60 * 60 * 1000
        )
      });
    } else {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: new Date(
          currentDate.getTime() + 3 * 24 * 60 * 60 * 1000
        )
      });
    }

    var transport = nodemailer.createTransport({
      host: process.env.HOST,
      port: Number(process.env.PORT),
      auth: {
        user: process.env.USER,
        pass: process.env.PASS
      }
    });

    const mailOptions = {
      from: 'vishnuk@gmail.com',
      to: email,
      subject:
        emailType === EmailTypes.VERIFY
          ? 'Email Verification'
          : 'Reset Password',
      html: `<p> Click <a href='${process.env.FRONT_END_URL}/verifyemail?token=${hashedToken}'> here </a> ${
        emailType === EmailTypes.VERIFY
          ? 'Email Verification'
          : 'Reset Password'
      } or copy paste the link below in your browser <br />${process.env.FRONT_END_URL}/verifyemail?token=${hashedToken} </p>`
    };

    return await transport.sendMail(mailOptions);
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
