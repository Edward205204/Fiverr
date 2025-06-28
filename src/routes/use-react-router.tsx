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
import ManageJobTypePage from '@/pages/ManageJobTypePage/manage-job-type-page';
import ManageServicePage from '@/pages/ManageServicePage/manage-service-page';
import ProfilePage from '@/pages/ProfilePage';

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
        },
        {
          path: path.manage_service,
          element: (
            <ManagerLayout>
              <ManageServicePage />
            </ManagerLayout>
          )
        },
        {
          path: path.profile,
          element: (
            <MainLayout>
              <ProfilePage />
            </MainLayout>
          )
        }
      ]
    }
  ]);
  return routeElements;
}
