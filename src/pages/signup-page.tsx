import axios from 'axios';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';

const tokenCybersoft =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBETiAxNCIsIkhldEhhblN0cmluZyI6IjE1LzEwLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc2MDQ4NjQwMDAwMCIsIm5iZiI6MTczMDMzMjgwMCwiZXhwIjoxNzYwNjU5MjAwfQ.P0-adChuwGt_dA8kRO_sxBjpC2NVGZr7B0F_3jou79s';

const RegisterSchema = z
  .object({
    email: z.string().email('Invalid email').nonempty('Email cannot be blank'),
    password: z.string().nonempty('Password cannot be blank').min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Confirm password phải có ít nhất 6 ký tự'),
    phoneNumber: z
      .string()
      .regex(/^\d{10}$/, 'Phone must be a valid phone number')
      .optional(),
    fullName: z.string().nonempty('Name cannot be blank'),
    user: z.string().nonempty('User cannot be blank'),
    groupCode: z.string().regex(/^\d+$/, 'Group code must be a number').optional()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  });

export default function Signup() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      user: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      email: '',
      phoneNumber: '',
      groupCode: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    try {
      const data = {
        id: 2009,
        taiKhoan: values.user,
        password: values.password,
        email: values.email,
        phone: values.phoneNumber,
        role: 'KhachHang',
        maNhom: values.groupCode,
        name: values.fullName,
        skill: [],
        certification: []
      };

      await axios.post('https://fiverrnew.cybersoft.edu.vn/api/auth/signup', data, {
        headers: {
          TokenCybersoft: tokenCybersoft,
          'Content-Type': 'application/json'
        }
      });

      alert('Registration successful');
      navigate('/login');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Registration error:', err);
      // alert('Registration failed: ' + (err as AxiosError)?.response?.data?.message || 'Unknown error');
    }
  };

  const renderError = (field: keyof typeof errors) =>
    errors[field] && <div className='text-red-500 text-sm'>{errors[field]?.message}</div>;

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-[#161623] to-[#23243a]'>
      <div className='max-w-4xl p-8 rounded-xl shadow-xl bg-[#1F1F2D]'>
        <div className='flex flex-row gap-10 '>
          <div className='flex flex-col justify-center items-center '>
            <img
              src='https://www.naijatechguide.com/wp-content/uploads/2018/10/fiverr-overview.jpeg'
              className='w-[480px] h-[300px] object-contain'
            />
          </div>
          <div className='w-[50%]'>
            <h1 className='text-4xl font-bold text-center text-white'>Register</h1>
            <h3 className='text-shadow-white font-bold text-center text-white mb-8'>Please fill in all information</h3>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
              <label className='text-white'>
                User
                <Input
                  {...register('user')}
                  className='w-full px-4 py-3 rounded-lg bg-[#23243a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-2 mb-2'
                />
                {renderError('user')}
              </label>

              <label className='text-white'>
                Password
                <Input
                  type='password'
                  {...register('password')}
                  className='w-full px-4 py-3 rounded-lg bg-[#23243a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-2 mb-4'
                />
                {renderError('password')}
              </label>

              <label className='text-white'>
                Confirm Password
                <Input
                  type='password'
                  {...register('confirmPassword')}
                  className='w-full px-4 py-3 rounded-lg bg-[#23243a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-2 mb-4'
                />
                {renderError('confirmPassword')}
              </label>

              <label className='text-white'>
                Full Name
                <Input
                  {...register('fullName')}
                  className=' w-full px-4 py-3 rounded-lg bg-[#23243a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-2 mb-4'
                />
                {renderError('fullName')}
              </label>

              <label className='text-white'>
                Email
                <Input
                  {...register('email')}
                  className=' w-full px-4 py-3 rounded-lg bg-[#23243a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-2 mb-4'
                />
                {renderError('email')}
              </label>

              <label className='text-white'>
                Phone
                <Input
                  {...register('phoneNumber')}
                  className='w-full px-4 py-3 rounded-lg bg-[#23243a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-2 mb-4'
                />
                {renderError('phoneNumber')}
              </label>

              <div className='flex gap-4'>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full py-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition disabled:opacity-60'
                >
                  {isSubmitting ? 'Creating...' : 'Create Account'}
                </button>
                <button
                  type='button'
                  onClick={() => navigate('/login')}
                  className='w-full py-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition'
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
