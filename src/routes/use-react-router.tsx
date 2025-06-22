import path from '@/constants/path';
import { Suspense } from 'react';
import { useRoutes } from 'react-router';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ProtectedRoute, RejectedRoute } from './routes-guards';
import MainLayout from '@/layouts/main-layout';
import ErrorPage from '@/pages/error-page';
import HomePage from '@/pages/HomePage/home-page';

export default function useReactRouter() {
  const routeElements = useRoutes([
    {
      path: '',
      // element: <ProtectedRoute /> -> day moi dung,
      element: <RejectedRoute />,
      children: [
        {
          path: path.home,
          element: (
            <Suspense
              fallback={
                <div className='flex text-[#ee4d2d] items-center justify-center w-full h-screen'>Loading...</div>
              }
            >
              <MainLayout>
                <HomePage />
              </MainLayout>
            </Suspense>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: []
    },
    {
      path: '*',
      element: <ErrorPage />
    }
  ]);
  return routeElements;
}
