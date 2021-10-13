import { useQuery } from 'react-query';

import { FormatMovieResponse } from '..';

import { axios } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';

export const getFormatMovie = (): Promise<FormatMovieResponse> => {
  return axios.get(`/screenDetail/all`);
};

type UseFormatOptions = {
  config?: QueryConfig<typeof getFormatMovie>;
};

export const useFormatMovie = ({ config }: UseFormatOptions = {}) => {
  return useQuery({
    ...config,
    queryKey: ['formatMovie'],
    queryFn: () => getFormatMovie(),
  });
};
