import { useContext } from 'react';
import { AppContext } from '@/contexts/app.context';
import path from '@/constants/path';
import { Navigate, Outlet } from 'react-router';

export function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext);

  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />;
}
export function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext);
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />;
}
