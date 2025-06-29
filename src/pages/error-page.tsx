import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';

export default function ErrorPage() {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100'>
      <div className='text-center px-6 py-12'>
        <div className='mb-8'>
          <div className='mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center'>
            <svg
              className='w-12 h-12 text-red-500'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
              />
            </svg>
          </div>
        </div>

        <h1 className='text-6xl font-bold text-gray-800 mb-4'>404</h1>
        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>Page not found</h2>
        <p className='text-gray-600 mb-8 max-w-md mx-auto'>
          Sorry, the page you are looking for does not exist or has been moved.
        </p>

        <div className='space-x-4'>
          <Button
            onClick={handleBackToHome}
            className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors'
          >
            Back to home
          </Button>
        </div>

        <div className='mt-12 text-sm text-gray-500'>
          <p>If you have any questions, please contact support.</p>
        </div>
      </div>
    </div>
  );
}
