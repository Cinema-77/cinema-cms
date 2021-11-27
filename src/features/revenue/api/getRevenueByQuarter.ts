import { useQuery } from 'react-query';

import { RevenueQuarterResponse } from '@/features/revenue';
import { axios } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';

interface RevenuDTO {
  cinemaId: string;
}

export const getRevenueByQuarter = ({ cinemaId }: RevenuDTO): Promise<RevenueQuarterResponse> => {
  return axios.get(`/cinema/get/thong-ke-theo-quy`, {
    params: {
      cinemaId: cinemaId,
    },
  });
};

export const getAllRevenueByQuarter = (): Promise<RevenueQuarterResponse> => {
  return axios.get(`/cinema/get/thong-ke-all-rap-theo-quy`);
};

type UseRevenueOptions = {
  config?: QueryConfig<typeof getRevenueByQuarter>;
  cinemaId: string;
};

export const useGetRevenueByQuarter = ({ config, cinemaId }: UseRevenueOptions) => {
  return useQuery({
    ...config,
    queryKey: ['revenueByCinema'],
    queryFn: () =>
      getRevenueByQuarter({
        cinemaId,
      }),
  });
};

export const useGetAllRevenueByQuarter = ({ config }: UseRevenueOptions = { cinemaId: '' }) => {
  return useQuery({
    ...config,
    queryKey: ['revenueByAllCinema'],
    queryFn: () => getAllRevenueByQuarter(),
  });
};
