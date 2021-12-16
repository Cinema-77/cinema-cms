import { useQuery } from 'react-query';

import { CinemaRespon } from '../type';

import { axios } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';

export const getCinemas = (): Promise<CinemaRespon> => {
  return axios.get(`/cinema/all`);
};

type UseCinemasOptions = {
  config?: QueryConfig<typeof getCinemas>;
};

export const useCinemas = ({ config }: UseCinemasOptions = {}) => {
  return useQuery({
    ...config,
    queryKey: ['cinemas'],
    queryFn: () => getCinemas(),
  });
};
