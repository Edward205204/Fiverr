import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { SigninSchema, SigninSchemaType } from '@/utils/rules';
import path from '@/constants/path';
import { Link, useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import authApi from '@/apis/auth.api';
import { setAccessTokenToLS, setProfileToLS } from '@/utils/auth';

export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SigninSchemaType>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const navigate = useNavigate();
  const useSigninMutation = useMutation({
    mutationFn: (data: SigninSchemaType) => {
      return authApi.signin(data);
    },
    onSuccess: (data) => {
      setAccessTokenToLS(data.data.content.token);
      setProfileToLS(data.data.content.user);
      navigate(path.home);
    }
  });

  const onSubmit = (data: SigninSchemaType) => {
    useSigninMutation.mutate(data);
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-[#161623] to-[#23243a] relative'>
      <div className='absolute top-6 left-6'>
        <Link to={path.home} className='flex items-center gap-2'>
          <div className='w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center'>
            <span className='text-white font-bold text-lg'>F</span>
          </div>
          <span className='text-white font-bold text-xl'>Fiverr</span>
        </Link>
      </div>

      <div className='max-w-4xl p-8 rounded-xl shadow-xl bg-[#1F1F2D]'>
        <div className='flex flex-row gap-4'>
          <img
            src='https://www.naijatechguide.com/wp-content/uploads/2018/10/fiverr-overview.jpeg'
            className='w-120 h-100'
          />
          <div>
            <h1 className='text-4xl font-bold text-center text-white'>Welcome back</h1>
            <h3 className='text-shadow-white font-bold text-center text-white mb-8'>Sign in to your account</h3>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
              <label className='text-white'>
                Email
                <Input
                  {...register('email')}
                  className='w-full px-4 py-3 rounded-lg bg-[#23243a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-2 mb-2'
                />
                {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
              </label>

              <label className='text-white'>
                Password
                <Input
                  {...register('password')}
                  type='password'
                  className='w-full px-4 py-3 rounded-lg bg-[#23243a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-2 mb-4'
                />
                {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
              </label>

              <button
                type='submit'
                disabled={isSubmitting}
                className='w-full py-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition disabled:opacity-50'
              >
                {isSubmitting ? 'Loading...' : 'Signin'}
              </button>
            </form>

            <p className='mt-6 text-center text-gray-400'>
              Don't have an account?
              <a href={path.signup} className='text-indigo-400 hover:underline'>
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
