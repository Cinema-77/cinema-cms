// import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
// import { QueryConfig } from '@/lib/react-query';

export const getShowTimes = (data: any): Promise<any> => {
  return axios.get(`/showTime/all`, data);
};

// type UseShowTimesOptions = {
//   config?: QueryConfig<typeof getShowTimes>;
// };

// export const useTimeSlots = ({ config }: UseShowTimesOptions = {}) => {
//   return useQuery({
//     ...config,
//     queryKey: ['timeSlots'],
//     queryFn: () => getShowTimes(),
//   });
// };
