// import { MainLayout } from '@/components/Layout';
import { MainLayout } from '@/components/Layout';
import { lazyImport } from '@/utils/lazyImport';

const { Auth } = lazyImport(() => import('@/features/auth'), 'Auth');
const { DashBoard } = lazyImport(() => import('@/features/dashboard'), 'DashBoard');
const { Cinema } = lazyImport(() => import('@/features/cinema'), 'Cinema');
const { manageMovie } = lazyImport(() => import('@/features/manageMovie'), 'manageMovie');

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
      {
        path: '/cinema',
        component: Cinema,
        title: 'Cinema',
      },
      {
        path: '/managemovie',
        component: manageMovie,
        title: 'Manage Movie',
      },
    ],
  },
];

export default routes;
