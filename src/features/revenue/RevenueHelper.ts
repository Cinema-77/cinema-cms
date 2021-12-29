import * as R from 'ramda';

import { IRevenueData } from '@/features/revenue';
import { formatNumber } from '@/utils/format';

export const getTotalMovie = (data: IRevenueData[], groupName: string) => {
  const isGroupName = (n: IRevenueData) => n.movieName === groupName;
  const getTotalEachMovie = (n: IRevenueData) => n.total;

  return R.sum(R.map(getTotalEachMovie, R.filter(isGroupName, data)));
};

export const sortByDate = R.sortBy(R.prop('date'));

const getTotalMovieInRangeDate = (movieName: string, data: IRevenueData[]) => {
  const lstDate = R.uniq(sortByDate(data).map((d) => d.date));
  return lstDate.map((date) => {
    const isMovieAndDate = (n: IRevenueData) => n.date === date && n.movieName === movieName;
    const getTotalEachMovie = (n: IRevenueData) => n.total;

    return R.sum(R.map(getTotalEachMovie, R.filter(isMovieAndDate, data)));
  });
};

export const getSeriesByMonth = (data: IRevenueData[]) => {
  const lstMovie = R.uniq(data.map((d) => d.movieName));
  return lstMovie.map((movieName) => ({
    name: movieName,
    data: getTotalMovieInRangeDate(movieName, data),
  }));
};

export const mapDataRevenue = (data: IRevenueData[]) => {
  return data.map((revenue) => ({
    ...revenue,
    price: revenue.price,
    totalString: formatNumber(revenue.total),
    promotion: revenue.promotion * -1,
  }));
};

export const mapDataInfo = (data: IRevenueData) => ({
  id: data.billId,
  movieName: data.movieName,
  createdAt: data.createdAt,
  price: data.price,
  quantity: data.quantity,
  promotion: data.promotion,
  promotionType: data.promotionType,
  roomName: data.roomName,
  screenName: data.screenName,
  total: formatNumber(data.total),
  type: data.type,
  date: data.date,
  staffFullName: data.staff.profile?.fullName || '',
  userName: data.user.profile?.fullName || '',
});
