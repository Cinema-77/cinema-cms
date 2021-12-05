import * as R from 'ramda';

import { IRevenueData } from '@/features/revenue';
import { formatNumber } from '@/utils/format';

export const getTotalMovie = (data: IRevenueData[], groupName: string) => {
  const isGroupName = (n: IRevenueData) => n.movieName === groupName;
  const getTotalEachMovie = (n: IRevenueData) => n.total;

  return R.sum(R.map(getTotalEachMovie, R.filter(isGroupName, data)));
};

const getTotalMovieInRangeDate = (movieName: string, data: IRevenueData[]) => {
  const lstDate = R.uniq(data.map((d) => d.date));
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
    price: formatNumber(revenue.price),
    totalString: formatNumber(revenue.total),
    promotion: revenue.promotion * -1,
  }));
};
