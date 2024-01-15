'use client';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { ImSpinner10 } from 'react-icons/im';

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    try {
      const response = await axios.get('api/users/logout');
      if (response) {
        toast.success(response.data.message);
        router.push('/login');
      }
    } catch (error: any) {
      toast.error('Something went wrong');
    }
  };

  const getUserDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/users/me');
      if (response && response?.data?.user) {
        setUser(response?.data?.user?._id);
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error.message);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>
      <h1>Profile Page</h1>
      <button
        className='bg-red-600 rounded-md p-2 mt-2 hover:bg-red-950'
        onClick={logout}
      >
        Logout
      </button>
      <button
        className='bg-green-600 rounded-md p-2 mt-2 hover:bg-green-950 flex items-center gap-2'
        disabled={loading}
        onClick={getUserDetails}
      >
        Get User Details {loading && <ImSpinner10 className='animate-spin' />}
      </button>
      <h1 className='mt-5 underline text-blue-700'>
        <Link href={`profile/${user}`}>{user && user}</Link>
      </h1>
    </div>
  );
}
