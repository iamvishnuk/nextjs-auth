'use client';
import axios from 'axios';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string>('');
  const [verified, setVerified] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post('/api/users/verifyemail', { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = searchParams.get('token');
    setToken(urlToken || '');
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <>
      <div className='flex flex-col justify-center items-center min-h-screen'>
        <h1 className='text-4xl'>Verify Email</h1>
        <h2 className='bg-orange-500 text-black'>
          {token.length > 0 ? token : 'No token'}
        </h2>
        {verified && (
          <>
            <h2>Email Verified</h2>
            <Link
              href={'/login'}
              className='text-blue-600'
            >
              Login
            </Link>
          </>
        )}
        {error && (
          <>
            <p className='text-red-600 text-lg'>Something went wrong</p>
          </>
        )}
      </div>
    </>
  );
}
