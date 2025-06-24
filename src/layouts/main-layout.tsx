import Footer from '@/components/shared/footer';
import Header from '@/components/shared/header';
import path from '@/constants/path';

import { ReactNode } from 'react';
import { useLocation } from 'react-router';

interface props {
  children?: ReactNode;
}

export default function MainLayout({ children }: props) {
  const location = useLocation();
  const isHomePage = location.pathname === path.home;
  console.log(isHomePage);
  return (
    <>
      {isHomePage ? <></> : <Header />}
      {children}
      <Footer />
    </>
  );
}
