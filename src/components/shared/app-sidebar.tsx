import { Briefcase, List, Package, User } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import { Link, useLocation } from 'react-router';
import path from '@/constants/path';

const items = [
  // {
  //   title: 'Back to Home',
  //   url: path.home,
  //   icon: Home
  // },
  {
    title: 'Manage Account',
    url: path.manage_user,
    icon: User
  },
  {
    title: 'Manage Job',
    url: path.manage_job,
    icon: Briefcase
  },
  {
    title: 'Manage Job Type',
    url: path.manage_job_type,
    icon: List
  },
  {
    title: 'Manage Service',
    url: path.manage_service,
    icon: Package
  }
];

export function AppSidebar() {
  const url = useLocation().pathname.split('/')[1];

  const TITLE = items.find((item) => item.url === `/${url}`)?.title;

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className='text-2xl font-bold text-center text-primary py-6'>{TITLE}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className={TITLE === item.title ? ' text-[#1dbf73] ' : ''}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
