import React from 'react';
import SidebarWithHeader from '../Navbar/Sidebar';

interface MainLayoutProps {}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return <SidebarWithHeader>hello</SidebarWithHeader>;
};
