// import { MainLayout } from '@/components/Layout';
import { MainLayout } from '@/components/Layout';
import { lazyImport } from '@/utils/lazyImport';

const { Auth } = lazyImport(() => import('@/features/auth'), 'Auth');
const { DashBoard } = lazyImport(() => import('@/features/dashboard'), 'DashBoard');
const { Cinemas } = lazyImport(() => import('@/features/cinema'), 'Cinemas');
const { Cinema } = lazyImport(() => import('@/features/cinema'), 'Cinema');

const routes: any[] = [
  {
    path: '/',
    component: Auth,
    title: 'Đăng nhập',
    exact: true,
  },
  {
    auth: true,
    component: MainLayout,
    routes: [
      {
        path: '/dashboard',
        component: DashBoard,
        title: 'DashBoard',
      },
      {
        exact: true,
        path: '/cinema',
        component: Cinemas,
        title: 'List Cinemas',
      },
      {
        path: '/cinema/:_id',
        component: Cinema,
        title: 'Cinema',
      },
    ],
  },
];

export default routes;
