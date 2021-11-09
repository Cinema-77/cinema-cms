export const ROUTES = {
  AUTH: '/',
  DASHBOARD: '/dashboard',
  CINEMA_LIST: '/cinema/list',
  CINEMA_DETAIL: '/cinema/list/detail/:_id',
  CINEMA_CREATE: '/cinema/create',
  MOVIE: '/managemovie',
  REVENUE: '/revenue',
  ROOM_LIST: '/room/listRoom',
  ROOM_CREATE: '/room/createRoom',
  SHOWTIMES_CREATE: '/showtimes/create',
  SELLER: '/seller',
  SELLER_TICKET_ID: '/seller/bookTicket/:_id',
  PAYMENT_COMPLETE: '/seller/paymentComplete',
};

export const SITE_MODAL_TYPES = Object.freeze({
  MEMBER_FORM: 'memberForm',
  BONUS_FORM: 'bonusForm',
  COUPON_FORM: 'couponForm',
});
