import { RouteWithSubRoutes } from '@/routes/config';
import React from 'react';
import SidebarWithHeader from '../Navbar/Sidebar';

interface MainLayoutProps {
  routes: any;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ routes }) => {
  return (
    <SidebarWithHeader>
      {routes.map((route: any, i: number) => (
        <RouteWithSubRoutes key={`${i}-${route.title}`} {...route} />
      ))}
    </SidebarWithHeader>
  );
};
