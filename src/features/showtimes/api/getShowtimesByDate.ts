import { useQuery } from 'react-query';

import { ShowTimesListByDateResponse } from '..';

import { axios } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';

interface ShowTimesDTO {
  date: string;
}

export const getShowTimesByDate = ({
  date,
}: ShowTimesDTO): Promise<ShowTimesListByDateResponse> => {
  return axios.get(`/showTime/get-list-showtime-by-date`, {
    params: {
      date,
    },
  });
};

type UseShowTimesOptions = {
  config?: QueryConfig<typeof getShowTimesByDate>;
  date: string;
};

export const useShowTimesByDate = ({ config, date }: UseShowTimesOptions) => {
  return useQuery({
    ...config,
    queryKey: ['showTimes', date],
    queryFn: () => getShowTimesByDate({ date }),
  });
};
