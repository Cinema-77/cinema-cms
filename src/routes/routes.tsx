// import { MainLayout } from '@/components/Layout';
import { MainLayout } from '@/components/Layout';
import { lazyImport } from '@/utils/lazyImport';

const { Auth } = lazyImport(() => import('@/features/auth'), 'Auth');
const { DashBoard } = lazyImport(() => import('@/features/dashboard'), 'DashBoard');

const routes: any[] = [
  {
    path: '/',
    component: Auth,
    title: 'Đăng nhập',
    exact: true,
  },
  {
    component: MainLayout,
    routes: [
      {
        path: '/dashboard',
        component: DashBoard,
        title: 'DashBoard',
      },
    ],
  },
];

export default routes;
