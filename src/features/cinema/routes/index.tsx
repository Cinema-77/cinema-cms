import { SiteHeader } from '@/components/Layout';
import { Box } from '@chakra-ui/react';
import React from 'react';
import { useCinemas } from '../api/getCinema';
import { CinemaItem } from '../components';
import { AddCinemaModal } from '../components/AddCinemaModal';
import { Skeleton, Stack } from '@chakra-ui/react';
interface CinemaProps {}

export const Cinema: React.FC<CinemaProps> = () => {
  const { isLoading, data } = useCinemas();
  return (
    <>
      <SiteHeader menuName="Cinema" heading="List Cinema" showButton={<AddCinemaModal />} />
      <Box px="3">
        {isLoading ? (
          <Stack>
            <Skeleton height="279px" borderRadius="8px" />
            <Skeleton height="279px" borderRadius="8px" />
            <Skeleton height="279px" borderRadius="8px" />
            <Skeleton height="279px" borderRadius="8px" />
          </Stack>
        ) : (
          data?.values?.cinemas.map((cinema) => <CinemaItem key={cinema._id} {...cinema} />)
        )}
      </Box>
    </>
  );
};
