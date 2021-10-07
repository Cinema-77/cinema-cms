import { axios } from '@/lib/axios';

export const deleteMovie = (id: string) => {
  return axios.delete(`movie/delete/${id}`);
};
