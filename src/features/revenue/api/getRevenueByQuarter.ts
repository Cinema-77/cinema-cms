import { useQuery } from 'react-query';

import { RevenueQuarterResponse } from '@/features/revenue';
import { axios } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';

interface RevenuDTO {
  cinemaId: string;
}

export const getRevenueByQuarter = (data: RevenuDTO): Promise<RevenueQuarterResponse> => {
  return axios.get(`/cinema/get/thong-ke-theo-quy`, {
    params: {
      cinemaId: data.cinemaId,
    },
  });
};

type UseRevenueOptions = {
  config?: QueryConfig<typeof getRevenueByQuarter>;
  cinemaId: string;
};

export const useGetRevenueByQuarter = ({ config, cinemaId }: UseRevenueOptions) => {
  return useQuery({
    ...config,
    queryKey: ['revenue'],
    queryFn: () =>
      getRevenueByQuarter({
        cinemaId,
      }),
  });
};
