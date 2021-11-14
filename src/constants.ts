export const ROUTES = {
  AUTH: '/auth/*',
  DASHBOARD: '/app/dashboard',
  CINEMA_LIST: '/app/cinema/list',
  CINEMA_DETAIL: '/app/cinema/list/:_id',
  MOVIE: '/app/managemovie',
  REVENUE: '/app/revenue',
  ROOM_LIST: '/app/room/listRoom',
  SHOWTIMES_CREATE: '/app/showtimes/create',
  SELLER: '/app/seller',
  PAYMENT_COMPLETE: '/app/seller/paymentComplete',
  SELLER_TICKET_ID: '/app/seller/bookTicket/:_id',
  FOODS: '/app/foods',
};

export const SITE_MODAL_TYPES = Object.freeze({
  MEMBER_FORM: 'memberForm',
  BONUS_FORM: 'bonusForm',
  COUPON_FORM: 'couponForm',
});

export const PRICE = {
  STUDENT: 45000,
  CHILD: 50000,
};
