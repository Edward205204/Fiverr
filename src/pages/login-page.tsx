import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { SigninSchema, SigninSchemaType } from '@/utils/rules';
import path from '@/constants/path';
import { Link } from 'react-router';

export default function Login() {
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

  const onSubmit = (data: z.infer<typeof SigninSchema>) => {
    console.log(data);
  };

  const renderError = (field: keyof typeof errors) =>
    errors[field] && <div className='text-xs text-red-400 font-medium'>{errors[field]?.message}</div>;

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-[#161623] to-[#23243a] relative'>
      {/* Logo */}
      <div className='absolute top-6 left-6'>
        <Link to={path.home} className='flex items-center gap-2'>
          <div className='w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center'>
            <span className='text-white font-bold text-lg'>F</span>
          </div>
          <span className='text-white font-bold text-xl'>Fiverr</span>
        </Link>
      </div>

      <div className='max-w-4xl p-6 rounded-xl bg-[#1F1F2D]'>
        <div className='flex gap-8'>
          <div className='flex flex-col gap-8 items-stretch'>
            <img
              src='https://www.naijatechguide.com/wp-content/uploads/2018/10/fiverr-overview.jpeg'
              className='w-[450px] h-full object-cover'
            />
          </div>
          <div className='w-[50%] flex flex-col justify-center'>
            <h1 className='text-3xl font-bold text-center text-white mb-1'>Welcome back</h1>
            <h3 className='font-semibold text-center text-white mb-6 text-sm'>Sign in to your account</h3>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
              <div className='flex flex-col gap-1'>
                <label className='text-white font-medium text-sm' htmlFor='email'>
                  Email
                </label>
                <Input
                  id='email'
                  {...register('email')}
                  className='w-full px-3 py-2 rounded-lg bg-[#23243a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                />
                <div className='h-4 text-xs text-red-400'>{renderError('email')}</div>
              </div>

              <div className='flex flex-col gap-1'>
                <label className='text-white font-medium text-sm' htmlFor='password'>
                  Password
                </label>
                <Input
                  id='password'
                  type='password'
                  {...register('password')}
                  className='w-full px-3 py-2 rounded-lg bg-[#23243a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                />
                <div className='h-4 text-xs text-red-400'>{renderError('password')}</div>
              </div>

              <button
                type='submit'
                disabled={isSubmitting}
                className='w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition disabled:opacity-60 mt-2'
              >
                {isSubmitting ? 'Loading...' : 'Sign In'}
              </button>
            </form>

            <p className='mt-4 text-center text-gray-400 text-sm'>
              Don't have an account?
              <Link to={path.signup} className='text-indigo-400 hover:underline ml-1'>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
