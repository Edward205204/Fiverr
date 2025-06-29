import path from '@/constants/path';
import { Suspense } from 'react';
import { useRoutes } from 'react-router';
import { ProtectedRoute, RejectedRoute } from './routes-guards';
import MainLayout from '@/layouts/main-layout';
import ErrorPage from '@/pages/error-page';
import HomePage from '@/pages/HomePage/home-page';
import Signin from '@/pages/signin-page';
import Signup from '@/pages/signup-page';
import Jobs from '@/pages/jobs';
import JobTypePage from '@/pages/JobTypePage';
import ManageUserPage from '@/pages/manage-user-page';
import ManagerLayout from '@/layouts/manager-layout';
import ManageJobPage from '@/pages/manage-job-page';
import ManageJobTypePage from '@/pages/manage-job-type-page';
import JobTypePage3 from '@/pages/JobTypePage3/job-type-page3';

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
      path: path.job_type_page,
      element: (
        <MainLayout>
          <JobTypePage />
        </MainLayout>
      )
    },
    {
      path: path.job_type_page3,
      element: (
        <MainLayout>
          <JobTypePage3 />
        </MainLayout>
      )
    },
    {
      path: '*',
      element: <ErrorPage />
    },
    {
      path: path.jobs,
      element: (
        <MainLayout>
          <Jobs />
        </MainLayout>
      )
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
      element: <ProtectedRoute />,
      children: [
        {
          path: path.manage_user,
          element: (
            <ManagerLayout>
              <ManageUserPage />
            </ManagerLayout>
          )
        },
        {
          path: path.manage_job,
          element: (
            <ManagerLayout>
              <ManageJobPage />
            </ManagerLayout>
          )
        },
        {
          path: path.manage_job_type,
          element: (
            <ManagerLayout>
              <ManageJobTypePage />
            </ManagerLayout>
          )
        }
      ]
    }
  ]);
  return routeElements;
}
