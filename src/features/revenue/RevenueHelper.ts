import * as R from 'ramda';

import { IRevenueData } from '@/features/revenue';
import { formatNumber } from '@/utils/format';

export const getTotalMovie = (data: IRevenueData[], groupName: string) => {
  const isGroupName = (n: IRevenueData) => n.movieName === groupName;
  const getTotalEachMovie = (n: IRevenueData) => n.total;

  return R.sum(R.map(getTotalEachMovie, R.filter(isGroupName, data)));
};

export const mapDataRevenue = (data: IRevenueData[]) => {
  return data.map((revenue) => ({
    ...revenue,
    price: formatNumber(revenue.price),
    totalString: formatNumber(revenue.total),
  }));
};
