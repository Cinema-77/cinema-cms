import { Box, Skeleton, Stack } from '@chakra-ui/react';
import React from 'react';

import { useCinemas } from '../api/getCinema';
import { CinemaItem } from '../components';
import { CinemaModalCreate } from '../components/CinemaModalCreate';

import { SiteHeader } from '@/components/Layout';
interface CinemasProps {
  children: React.ReactNode;
}

export const Cinemas: React.FC<CinemasProps> = () => {
  const { isLoading, data } = useCinemas();

  return (
    <>
      <SiteHeader menuName="List Cinema" heading="List Cinema" showButton={<CinemaModalCreate />} />
      <Box px="3">
        {isLoading ? (
          <Stack>
            <Skeleton height="279px" borderRadius="8px" />
            <Skeleton height="279px" borderRadius="8px" />
            <Skeleton height="279px" borderRadius="8px" />
            <Skeleton height="279px" borderRadius="8px" />
          </Stack>
        ) : (
          data?.values?.cinemas.map((cinema) => <CinemaItem key={cinema.name} {...cinema} />)
        )}
      </Box>
    </>
  );
};
