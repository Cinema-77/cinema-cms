// import { MainLayout } from '@/components/Layout';
import { MainLayout } from '@/components/Layout';
import { lazyImport } from '@/utils/lazyImport';

const { Auth } = lazyImport(() => import('@/features/auth'), 'Auth');
const { DashBoard } = lazyImport(() => import('@/features/dashboard'), 'DashBoard');
const { Cinemas } = lazyImport(() => import('@/features/cinema'), 'Cinemas');
const { Cinema } = lazyImport(() => import('@/features/cinema'), 'Cinema');
const { CreateRoom } = lazyImport(() => import('@/features/room'), 'CreateRoom');
const { RoomList } = lazyImport(() => import('@/features/room'), 'RoomList');
const { ShowTimesCreate } = lazyImport(() => import('@/features/showtimes'), 'ShowTimesCreate');

const routes: any[] = [
  {
    path: '/',
    component: Auth,
    title: 'Đăng nhập',
    exact: true,
  },
  {
    // auth: true,
    component: MainLayout,
    routes: [
      {
        path: '/dashboard',
        component: DashBoard,
        title: 'DashBoard',
      },
      {
        exact: true,
        path: '/cinema/list',
        component: Cinemas,
        title: 'List Cinemas',
      },
      {
        exact: true,
        path: '/cinema/create',
        component: DashBoard,
        title: 'List Cinemas',
      },
      {
        path: '/cinema/detail/:_id',
        component: Cinema,
        title: 'Cinema',
      },
      {
        path: '/room/createRoom',
        component: CreateRoom,
        title: 'Create Room',
      },
      {
        path: '/room/listRoom',
        component: RoomList,
        title: 'List Room',
      },
      {
        path: '/showtimes/create',
        component: ShowTimesCreate,
        title: 'Create ShowTime',
      },
    ],
  },
];

export default routes;
