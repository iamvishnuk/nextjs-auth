'use client';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { ImSpinner10 } from 'react-icons/im';

type User = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>({
    email: '',
    password: ''
  });

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/login', user);
      console.log(response);
      if (response) {
        toast.success(response.data.message);
        setLoading(false);
        router.push('/');
      }
    } catch (error: any) {
      setLoading(false);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='min-h-screen flex flex-col justify-center items-center'>
        <h1 className='uppercase font-bold text-xl tracking-wide'>Login</h1>
        <div className='space-y-3'>
          <div className='flex flex-col'>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              type='text'
              placeholder='Email'
              className='bg-black border-2 rounded-md w-60 py-0.5 pl-2 border-white text-white focus:border-blue-500 focus:outline-none'
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              type='password'
              placeholder='Password'
              className='bg-black border-2 rounded-md w-60 py-0.5 pl-2 border-white text-white focus:border-blue-500 focus:outline-none'
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <div className='flex justify-between items-center'>
            <Link
              href={'/signup'}
              className='text-blue-900 text-xs hover:text-gray-500 font-bold'
            >
              New user ?
            </Link>
            <button
              className='bg-blue-600 py-1.5 px-2 rounded-lg hover:bg-blue-800 flex items-center gap-2'
              onClick={onLogin}
            >
              Login
              {loading && <ImSpinner10 className='animate-spin' />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
