import { MovieType, MovieRespon, MoviesResponse } from '../type';

import { axios } from '@/lib/axios';

export const getCategoryAll = () => {
  return axios.get('/category/all');
};

export const createMovie = (data: MovieType): Promise<MovieRespon> => {
  return axios.post('/movie/add', data);
};

export const deleteMovie = (id: string): Promise<MovieRespon> => {
  return axios.delete(`movie/delete/${id}`);
};

export const getDirectorAll = () => {
  return axios.get('/director/all');
};

export const getMovieAll = (params?: string): Promise<MoviesResponse> => {
  return axios.get(`/movie/all?${params}`);
};

export const getScreenAll = () => {
  return axios.get('/screen/all');
};

export const getMovie = (id: string) => {
  return axios.get(`/movie/${id}`);
};

export const updateMovie = (
  id: string | string[] | null,
  data: MovieType,
): Promise<MovieRespon> => {
  return axios.put(`/movie/update/${id}`, data);
};
