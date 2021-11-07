import { Spinner, Flex, Heading, Box } from '@chakra-ui/react';
import React from 'react';

import { ColumnChart, useGetRevenueByQuarter } from '@/features/revenue';

interface RevenueByQuarterFormProps {
  cinemaId: string;
}

export const RevenueByQuarterForm: React.FC<RevenueByQuarterFormProps> = ({ cinemaId }) => {
  const revenueByQuarterQuery = useGetRevenueByQuarter({ cinemaId });

  if (revenueByQuarterQuery.isLoading) {
    return (
      <Flex justifyContent="center">
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      </Flex>
    );
  }

  if (!revenueByQuarterQuery.data?.data) {
    return (
      <Box
        backgroundColor="white"
        textColor="gray.500"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        height="40"
      >
        <Heading as="h4" size="lg">
          Không có dữ liệu
        </Heading>
      </Box>
    );
  }

  return <ColumnChart data={revenueByQuarterQuery.data.data} />;
};
