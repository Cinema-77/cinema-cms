import { useQuery } from 'react-query';

import { RevenueResponse } from '@/features/revenue';
import { axios } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';

interface RevenuDTO {
  cinemaId: string;
  dateStart: string;
  dateEnd: string;
}

export const getRevenueFromDateToDate = (data: RevenuDTO): Promise<RevenueResponse> => {
  return axios.get(`/cinema/get/thong-ke-theo-ngay`, {
    params: {
      cinemaId: data.cinemaId,
      dateStart: data.dateStart,
      dateEnd: data.dateEnd,
    },
  });
};

type UseRoomsOptions = {
  config?: QueryConfig<typeof getRevenueFromDateToDate>;
  cinemaId: string;
  dateStart: string;
  dateEnd: string;
};

export const useGetRevenueFromDateToDate = ({
  config,
  dateEnd,
  cinemaId,
  dateStart,
}: UseRoomsOptions) => {
  return useQuery({
    ...config,
    queryKey: ['revenue', dateStart, dateEnd],
    queryFn: () =>
      getRevenueFromDateToDate({
        cinemaId,
        dateStart,
        dateEnd,
      }),
  });
};
