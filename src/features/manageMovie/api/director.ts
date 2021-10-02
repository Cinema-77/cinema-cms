import { axios } from '@/lib/axios';

export const getDirectorAll = () => {
  return axios.get('/director/all');
};
