import { AppSidebar } from '@/components/shared/app-sidebar';
import Header from '@/components/shared/header';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='flex flex-col w-full'>
        <Header searchBarStatus={false} />
        <div className='container'>{children}</div>
      </main>
    </SidebarProvider>
  );
}
