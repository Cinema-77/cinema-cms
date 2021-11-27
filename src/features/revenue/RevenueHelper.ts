import { formatNumber } from '@/utils/format';

const titles = Object.freeze({
  countAdultTicket: 'Số lượng vé người lớn được bán',
  countChildTicket: 'Số lượng vé trẻ em được bán',
  countStudentTicket: 'Số lượng vé học sinh được bán',
  countTicket: 'Số lượng vé bán ',
  countTicketCoupon: 'Số lượng vé đổi dùng Coupon',
  countTicketPoint: 'Số lượng vé đổi điểm',
  totalPrice: 'Tổng doanh thu',
  totalPriceFood: 'Tổng tiền bắp nước',
  totalPriceFoodCoupon: 'Tổng tiền thức ăn đổi bằng Coupon',
  totalPriceFoodPoint: 'Tổng tiền thức ăn đổi bằng điểm',
  totalPriceTicket: 'Tổng tiền giá vé',
  totalPriceTicketCoupon: 'Tổng tiền giá vé đổi bằng Coupon',
  totalPriceTicketPoint: 'Tổng tiền giá vé đổi bằng điểm',
}) as any;

export const getTitle = (key: string) => {
  return titles[key];
};

export const formatPrice = (key: string, num: number) => {
  return key.match(/total/) ? formatNumber(num) : num;
};

export const extractObjectKeys = (object: any) => {
  const objectKeys: string[] = [];
  Object.keys(object).forEach((objectKey) => {
    const value = object[objectKey];
    const isTruethy = !Array.isArray(value) && objectKey != 'date';

    if (isTruethy) {
      objectKeys.push(objectKey);
    }
  });

  return objectKeys.sort();
};

export const makeData = () => {};
