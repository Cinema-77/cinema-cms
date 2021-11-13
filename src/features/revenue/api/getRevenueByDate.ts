import { createStandaloneToast } from '@chakra-ui/react';
import { useMutation } from 'react-query';

import { RevenueResponse } from '@/features/revenue';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';

interface RevenuDTO {
  cinemaId: string;
  dateStart: string;
}

export const getRevenueByDate = (data: RevenuDTO): Promise<RevenueResponse> => {
  return axios.post(`/cinema/get/thong-ke-theo-ngay`, data);
};

type UseRevenueOptions = {
  config?: MutationConfig<typeof getRevenueByDate>;
};

export const useGetRevenueByDate = ({ config }: UseRevenueOptions = {}) => {
  const toast = createStandaloneToast();

  return useMutation({
    onMutate: async (newRevenue) => {
      await queryClient.cancelQueries('revenue');

      const previousRevenue = queryClient.getQueryData<RevenueResponse>('revenue');

      queryClient.setQueryData('revenue', {
        ...previousRevenue,
        data: [...(previousRevenue?.data || []), newRevenue],
      });

      return { previousRevenue };
    },
    onError: (_, __, context: any) => {
      if (context?.previousRevenue) {
        queryClient.setQueryData('revenue', context.previousRevenue);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('revenue');
      toast({
        title: 'Lấy dữ liệu doanh thu thành công',
        status: 'success',
        isClosable: true,
        position: 'top-right',
      });
    },
    ...config,
    mutationFn: getRevenueByDate,
  });
};
