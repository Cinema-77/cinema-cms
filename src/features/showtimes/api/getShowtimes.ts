import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';

export const getShowTimes = (data: any): Promise<any> => {
  return axios.post(`/showTime/get-list-showtime`, data);
};

type UseShowTimesOptions = {
  config?: QueryConfig<typeof getShowTimes>;
  data: {
    dateStart: string;
    dateEnd: string;
  };
};

export const useShowTimes = ({ config, data }: UseShowTimesOptions) => {
  return useQuery({
    ...config,
    queryKey: ['showTimes'],
    queryFn: () => getShowTimes(data),
  });
};
