import path from '@/constants/path';
import { Suspense } from 'react';
import { useRoutes } from 'react-router';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ProtectedRoute, RejectedRoute } from './routes-guards';
import MainLayout from '@/layouts/main-layout';
import ErrorPage from '@/pages/error-page';
import HomePage from '@/pages/HomePage/home-page';
import Signin from '@/pages/signin-page';
import Signup from '@/pages/signup-page';

export default function useReactRouter() {
  const routeElements = useRoutes([
    {
      path: path.home,
      element: (
        <Suspense
          fallback={<div className='flex text-[#811d01] items-center justify-center w-full h-screen'>Loading...</div>}
        >
          <MainLayout>
            <HomePage />
          </MainLayout>
        </Suspense>
      )
    },
    {
      path: '*',
      element: <ErrorPage />
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.signin,
          element: <Signin />
        },
        {
          path: path.signup,
          element: <Signup />
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: []
    }
  ]);
  return routeElements;
}
