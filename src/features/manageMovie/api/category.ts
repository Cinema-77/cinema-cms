import { axios } from '@/lib/axios';
export const getCategoryAll = () => {
  return axios.get('/category/all');
};
