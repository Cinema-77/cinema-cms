import { MovieRespon, MovieType } from './../type/index';

import { axios } from '@/lib/axios';

export const createMovie = (data: MovieType): Promise<MovieRespon> => {
  return axios.post('/movie/add', data);
};
