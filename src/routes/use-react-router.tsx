import path from '@/constants/path';
import { lazy, Suspense } from 'react';
import { useRoutes } from 'react-router';
import { ProtectedRoute, RejectedRoute } from './routes-guards';
import MainLayout from '@/layouts/main-layout';
import ErrorPage from '@/pages/error-page';
import ManageJobPage from '@/pages/manage-job-page';
import ManageJobTypePage from '@/pages/ManageJobTypePage/manage-job-type-page';
import ManageServicePage from '@/pages/ManageServicePage/manage-service-page';
import ProfilePage from '@/pages/ProfilePage';
import JobTypePage3 from '@/pages/JobTypePage3';

const HomePage = lazy(() => import('@/pages/HomePage/home-page'));
const Signin = lazy(() => import('@/pages/signin-page'));
const Signup = lazy(() => import('@/pages/signup-page'));
const Jobs = lazy(() => import('@/pages/jobs'));
const JobTypePage = lazy(() => import('@/pages/JobTypePage'));
const ManageUserPage = lazy(() => import('@/pages/manage-user-page'));
const ManagerLayout = lazy(() => import('@/layouts/manager-layout'));

export default function useReactRouter() {
  const routeElements = useRoutes([
    {
      path: path.home,
      element: (
        <Suspense
          fallback={<div className='flex text-[#1EBF73] items-center justify-center w-full h-screen'>Loading...</div>}
        >
          <MainLayout>
            <HomePage />
          </MainLayout>
        </Suspense>
      )
    },

    {
      path: path.job_type_page,
      element: (
        <Suspense
          fallback={<div className='flex text-[#1EBF73] items-center justify-center w-full h-screen'>Loading...</div>}
        >
          <MainLayout>
            <JobTypePage />
          </MainLayout>
        </Suspense>
      )
    },
    {
      path: '*',
      element: <ErrorPage />
    },
    {
      path: path.jobs,
      element: (
        <Suspense
          fallback={<div className='flex text-[#1EBF73] items-center justify-center w-full h-screen'>Loading...</div>}
        >
          <MainLayout>
            <Jobs />
          </MainLayout>
        </Suspense>
      )
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.signin,
          element: (
            <Suspense
              fallback={
                <div className='flex text-[#1EBF73] items-center justify-center w-full h-screen'>Loading...</div>
              }
            >
              <Signin />
            </Suspense>
          )
        },
        {
          path: path.signup,
          element: (
            <Suspense
              fallback={
                <div className='flex text-[#1EBF73] items-center justify-center w-full h-screen'>Loading...</div>
              }
            >
              <Signup />
            </Suspense>
          )
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.manage_user,
          element: (
            <Suspense
              fallback={
                <div className='flex text-[#1EBF73] items-center justify-center w-full h-screen'>Loading...</div>
              }
            >
              <ManagerLayout>
                <ManageUserPage />
              </ManagerLayout>
            </Suspense>
          )
        },
        {
          path: path.manage_job,
          element: (
            <Suspense
              fallback={
                <div className='flex text-[#1EBF73] items-center justify-center w-full h-screen'>Loading...</div>
              }
            >
              <ManagerLayout>
                <ManageJobPage />
              </ManagerLayout>
            </Suspense>
          )
        },
        {
          path: path.manage_job_type,
          element: (
            <Suspense
              fallback={
                <div className='flex text-[#1EBF73] items-center justify-center w-full h-screen'>Loading...</div>
              }
            >
              <ManagerLayout>
                <ManageJobTypePage />
              </ManagerLayout>
            </Suspense>
          )
        },
        {
          path: path.manage_service,
          element: (
            <Suspense
              fallback={
                <div className='flex text-[#1EBF73] items-center justify-center w-full h-screen'>Loading...</div>
              }
            >
              <ManagerLayout>
                <ManageServicePage />
              </ManagerLayout>
            </Suspense>
          )
        },
        {
          path: path.profile,
          element: (
            <Suspense
              fallback={
                <div className='flex text-[#1EBF73] items-center justify-center w-full h-screen'>Loading...</div>
              }
            >
              <MainLayout>
                <ProfilePage />
              </MainLayout>
            </Suspense>
          )
        },
        {
          path: path.job_detail,
          element: (
            <Suspense
              fallback={
                <div className='flex text-[#1EBF73] items-center justify-center w-full h-screen'>Loading...</div>
              }
            >
              <MainLayout>
                <JobTypePage3 />
              </MainLayout>
            </Suspense>
          )
        }
      ]
    }
  ]);
  return routeElements;
}
