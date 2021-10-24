import { MainLayout } from '@/components/Layout';
import { ROUTES } from '@/constants';
import { lazyImport } from '@/utils/lazyImport';

const { Auth } = lazyImport(() => import('@/features/auth'), 'Auth');
const { DashBoard } = lazyImport(() => import('@/features/dashboard'), 'DashBoard');
const { Cinemas } = lazyImport(() => import('@/features/cinema'), 'Cinemas');
const { Cinema } = lazyImport(() => import('@/features/cinema'), 'Cinema');
const { manageMovie } = lazyImport(() => import('@/features/manageMovie'), 'manageMovie');
const { CreateRoom } = lazyImport(() => import('@/features/room'), 'CreateRoom');
const { RoomList } = lazyImport(() => import('@/features/room'), 'RoomList');
const { ShowTimesCreate } = lazyImport(() => import('@/features/showtimes'), 'ShowTimesCreate');
const { SellerPage } = lazyImport(() => import('@/features/seller'), 'SellerPage');
const { SellerTicketWithRouter } = lazyImport(
  () => import('@/features/seller'),
  'SellerTicketWithRouter'
);

const routes: any[] = [
  {
    path: ROUTES.AUTH,
    component: Auth,
    title: 'Đăng nhập',
    exact: true,
  },
  {
    auth: true,
    component: MainLayout,
    routes: [
      {
        path: ROUTES.DASHBOARD,
        component: DashBoard,
        title: 'DashBoard',
      },
      {
        exact: true,
        path: ROUTES.CINEMA_LIST,
        component: Cinemas,
        title: 'List Cinemas',
      },
      {
        path: ROUTES.CINEMA_DETAIL,
        component: Cinema,
        title: 'Cinema',
      },
      {
        path: ROUTES.MOVIE,
        component: manageMovie,
        title: 'Manage Movie',
      },
      {
        path: ROUTES.ROOM_CREATE,
        component: CreateRoom,
        title: 'Create Room',
      },
      {
        path: ROUTES.ROOM_LIST,
        component: RoomList,
        title: 'List Room',
      },
      {
        path: ROUTES.SHOWTIMES_CREATE,
        component: ShowTimesCreate,
        title: 'Create ShowTime',
      },
      {
        path: ROUTES.SELLER,
        component: SellerPage,
        title: 'Lịch chiếu | Giá vé',
        exact: true,
      },
      {
        path: ROUTES.SELLER_TICKET_ID,
        component: SellerTicketWithRouter,
        title: 'Lịch chiếu | Giá vé',
      },
    ],
  },
];

export default routes;
