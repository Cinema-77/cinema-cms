import { axios } from '@/lib/axios';

export const getScreenAll = () => {
  return axios.get('/screen/all');
};
