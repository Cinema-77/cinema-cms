import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useMutation } from 'react-query';
import { CinemaRespone, CinemaType } from '../type';

export type CreateCommentDTO = {
  name: string;
  address: {
    city: string;
    district: string;
    ward: string;
    street: string;
  };
};

export const createCinema = (data: CreateCommentDTO): Promise<CinemaRespone> => {
  return axios.post('/cinema/add', data);
};

type UseCreateCinematOptions = {
  config?: MutationConfig<typeof createCinema>;
};

export const useCreateCinema = ({ config }: UseCreateCinematOptions = {}) => {
  return useMutation({
    onMutate: async (newCinema) => {
      await queryClient.cancelQueries('cinemas');

      const previousCinemas = queryClient.getQueryData<CinemaRespone>('cinemas');

      queryClient.setQueryData('cinemas', {
        ...previousCinemas,
        values: { cinemas: [...(previousCinemas?.values.cinemas || []), newCinema] },
      });

      return { previousCinemas };
    },
    onError: (_, __, context: any) => {
      if (context?.previousCinemas) {
        queryClient.setQueryData('cinemas', context.previousCinemas);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('cinemas');
    },
    ...config,
    mutationFn: createCinema,
  });
};
