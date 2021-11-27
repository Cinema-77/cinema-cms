import { Spinner, Flex, Heading, Box, Table, Td, Th, Tr, SimpleGrid } from '@chakra-ui/react';
import React from 'react';

import { ColumnChart, useGetRevenueByQuarter, useGetAllRevenueByQuarter } from '@/features/revenue';
import { formatNumber } from '@/utils/format';

interface RevenueByQuarterFormProps {
  cinemaId: string;
  type: string;
}

export const RevenueByQuarterForm: React.FC<RevenueByQuarterFormProps> = ({ cinemaId, type }) => {
  const revenueByQuarterQuery =
    type === 'All' ? useGetAllRevenueByQuarter() : useGetRevenueByQuarter({ cinemaId });

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

  const { data } = revenueByQuarterQuery.data;

  return (
    <Box>
      <ColumnChart
        data={{
          data: data,
          xCategories: data.map((value: any) => `Quý ${value.quarter}`),
          text: 'Doanh thu ',
          type: 'Quarter',
        }}
      />

      <SimpleGrid columns={2} spacing={10}>
        {data.map((rv) => (
          <Box key={rv.quarter}>
            <Heading as="h3" fontSize="20px" my={3}>
              Quý {rv.quarter}
            </Heading>
            <Table w="full">
              <thead>
                <Tr>
                  <Th>Tiêu đề</Th>
                  <Th>Doanh thu</Th>
                </Tr>
              </thead>
              <tbody>
                <Tr>
                  <Td>Tổng tiền vé</Td>
                  <Td>{formatNumber(rv.totalTicket)}</Td>
                </Tr>
                <Tr>
                  <Td>Tổng tiền thức ăn</Td>
                  <Td>{formatNumber(rv.totalFood)}</Td>
                </Tr>
                <Tr>
                  <Td>Tổng cộng</Td>
                  <Td>{formatNumber(rv.totalPrice)}</Td>
                </Tr>
              </tbody>
            </Table>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};
