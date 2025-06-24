import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { RegisterSchema, RegisterSchemaType } from '@/utils/rules';
import { useMutation } from '@tanstack/react-query';
import authApi from '@/apis/auth.api';
import path from '@/constants/path';

export default function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
      birthday: '',
      gender: false,
      skill: [],
      certification: []
    }
  });
  const signUpMutation = useMutation({
    mutationFn: authApi.signUp,
    onSuccess: (data) => {
      console.log(data);
      navigate('/signin');
    }
  });
  console.log('ERRORS:', errors);

  const onSubmit = async (values: RegisterSchemaType) => {
    console.log('ok');
    try {
      await signUpMutation.mutateAsync(values);
    } catch (error) {
      console.error(error);
    }
  };
  const renderError = (field: keyof typeof errors) =>
    errors[field] && <div className='text-red-500 text-sm'>{errors[field]?.message}</div>;

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br  bg-[#1F1F2D] relative'>
      {/* Logo */}
      <div className='absolute top-6 left-6'>
        <Link to={path.home} className='flex items-center gap-2'>
          <div className='w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center'>
            <span className='text-white font-bold text-lg'>F</span>
          </div>
          <span className='text-white font-bold text-xl'>Fiverr</span>
        </Link>
      </div>

      <div className='max-w-4xl p-6 rounded-xl  bg-[#1F1F2D]'>
        <div className='flex  gap-8 '>
          <div className=' flex flex-col gap-8 items-stretch'>
            <img
              src='https://www.naijatechguide.com/wp-content/uploads/2018/10/fiverr-overview.jpeg'
              className='w-[450px] h-full object-cover'
            />
          </div>
          <div className='w-[50%]'>
            <h1 className='text-3xl font-bold text-center text-white mb-1'>Register</h1>
            <h3 className='text-shadow-white font-bold text-center text-white mb-6 text-sm'>
              Please fill in all information
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
              <div className='flex flex-col gap-1'>
                <label className='text-white font-medium text-sm' htmlFor='name'>
                  Full Name
                </label>
                <Input
                  id='name'
                  {...register('name')}
                  className='w-full px-3 py-2 rounded-lg bg-[#23243a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                />
                <div className='h-4 text-xs text-red-400'>{renderError('name')}</div>
              </div>

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

              <div className='flex flex-col gap-1'>
                <label className='text-white font-medium text-sm' htmlFor='phone'>
                  Phone Number
                </label>
                <Input
                  id='phone'
                  {...register('phone')}
                  className='w-full px-3 py-2 rounded-lg bg-[#23243a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                />
                <div className='h-4 text-xs text-red-400'>{renderError('phone')}</div>
              </div>

              <div className='flex flex-col gap-1'>
                <label className='text-white font-medium text-sm' htmlFor='birthday'>
                  Birthday
                </label>
                <Input
                  id='birthday'
                  type='date'
                  {...register('birthday')}
                  className='w-full px-3 py-2 rounded-lg bg-[#23243a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                />
                <div className='h-4 text-xs text-red-400'>{renderError('birthday')}</div>
              </div>

              <div className='flex items-center gap-3'>
                <input
                  id='gender'
                  type='checkbox'
                  {...register('gender')}
                  className='accent-indigo-500 w-4 h-4 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500'
                />
                <label htmlFor='gender' className='text-white font-medium select-none cursor-pointer text-sm'>
                  Male (uncheck for Female)
                </label>
                <div className='h-4 text-xs text-red-400'>{renderError('gender')}</div>
              </div>

              <div className='flex flex-col gap-1'>
                <label className='text-white font-medium text-sm' htmlFor='skill'>
                  Skills (separated by commas)
                </label>
                <Input
                  id='skill'
                  {...register('skill', {
                    setValueAs: (v: unknown) =>
                      typeof v === 'string'
                        ? v
                            .split(',')
                            .map((s: string) => s.trim())
                            .filter(Boolean)
                        : Array.isArray(v)
                          ? v
                          : []
                  })}
                  placeholder='Example: React, Node.js, Photoshop'
                  className='w-full px-3 py-2 rounded-lg bg-[#23243a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                />
                <div className='h-4 text-xs text-red-400'>{renderError('skill')}</div>
              </div>

              <div className='flex flex-col gap-1'>
                <label className='text-white font-medium text-sm' htmlFor='certification'>
                  Certifications (separated by commas)
                </label>
                <Input
                  id='certification'
                  {...register('certification', {
                    setValueAs: (v: unknown) =>
                      typeof v === 'string'
                        ? v
                            .split(',')
                            .map((s: string) => s.trim())
                            .filter(Boolean)
                        : Array.isArray(v)
                          ? v
                          : []
                  })}
                  placeholder='Example: AWS, Google, TOEIC'
                  className='w-full px-3 py-2 rounded-lg bg-[#23243a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                />
                <div className='h-4 text-xs text-red-400'>{renderError('certification')}</div>
              </div>

              <div className='flex gap-4 pt-2'>
                <button
                  type='submit'
                  className='w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition disabled:opacity-60'
                >
                  {isSubmitting ? 'Creating...' : 'Create Account'}
                </button>
              </div>
              <div className='flex justify-center'>
                <Link to={path.signin} className='text-indigo-400 hover:underline text-center text-sm'>
                  Already have an account? Signin
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
