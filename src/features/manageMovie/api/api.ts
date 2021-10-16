import { MovieType, MovieRespon } from '../type';

import { axios } from '@/lib/axios';

export const getCategoryAll = () => {
  return axios.get('/category/all');
};

export const createMovie = (data: MovieType): Promise<MovieRespon> => {
  return axios.post('/movie/add', data);
};

export const deleteMovie = (id: string) => {
  return axios.delete(`movie/delete/${id}`);
};

export const getDirectorAll = () => {
  return axios.get('/director/all');
};

export const getMovieAll = () => {
  return axios.get('/movie/all');
};

export const getScreenAll = () => {
  return axios.get('/screen/all');
};

export const getMovie = (id: string) => {
  return axios.get(`/movie/${id}`);
};

export const updateMovie = (id: string, data: MovieType) => {
  return axios.put(`/movie/update/${id}`, data);
};
