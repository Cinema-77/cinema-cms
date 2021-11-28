import { MovieType, MovieRespon, MoviesResponse, MovieCMSResponse } from '../type';

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

export const getMovieAll = (): Promise<MoviesResponse> => {
  return axios.get('/movie/all');
};

export const getScreenAll = () => {
  return axios.get('/screen/all');
};

export const getMovie = (id: string) => {
  return axios.get(`/movie/${id}`);
};

export const updateMovie = (id: string, data: MovieType): Promise<MovieRespon> => {
  return axios.put(`/movie/update/${id}`, data);
};

export const getMovieAllCMS = (): Promise<MovieCMSResponse> => {
  return axios.get('/movie/get/movie-play-cms');
};
