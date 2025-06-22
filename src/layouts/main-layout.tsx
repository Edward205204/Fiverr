import Footer from '@/components/shared/footer';

import { ReactNode } from 'react';

interface props {
  children?: ReactNode;
}

export default function MainLayout({ children }: props) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
