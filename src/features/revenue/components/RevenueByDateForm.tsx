import { Box, Button, Flex, Heading, Stack } from '@chakra-ui/react';
import React from 'react';

import { Form, SingleSelect, Table, Td, Th, Tr } from '@/components';
import {
  useGetRevenueByDate,
  IRevenueData,
  getTitle,
  extractObjectKeys,
  formatPrice,
  ColumnChart,
} from '@/features/revenue';

type RevenueValues = {
  cinemaId: string;
  dateStart: string;
};

interface RevenueByDateFormProps {
  cinemaId: string;
}

export const RevenueByDateForm: React.FC<RevenueByDateFormProps> = ({ cinemaId }) => {
  const [report, setReport] = React.useState<IRevenueData[]>([]);
  console.log(report);
  const useGetRevenueByDateMutation = useGetRevenueByDate();

  return (
    <Stack spacing={2} width="full">
      <Stack direction="column" justifyContent="center" mx={4}>
        <Heading fontSize="20px">Thống kê doanh thu </Heading>
      </Stack>
      <Box width="50%" margin="auto">
        <Form<RevenueValues>
          onSubmit={async (data) => {
            const values = { ...data, cinemaId };
            const { data: res } = await useGetRevenueByDateMutation.mutateAsync(values);
            setReport(res);
          }}
        >
          {({ register, setValue }) => (
            <Flex alignItems="center" justifyContent="space-between">
              <SingleSelect
                registration={register('dateStart')}
                setValues={setValue}
                nameToSet="dateStart"
              />
              <Button
                backgroundColor="cyan.400"
                color="white"
                fontWeight="medium"
                type="submit"
                _hover={{
                  backgroundColor: 'cyan.700',
                }}
                maxWidth="200px"
                alignSelf="flex-end"
                ml={4}
                isLoading={useGetRevenueByDateMutation.isLoading}
              >
                Thống kê
              </Button>
            </Flex>
          )}
        </Form>
      </Box>

      {report.length > 0 && (
        <>
          <Stack spacing={5}>
            <Box flex={1}>
              <ColumnChart
                data={{
                  data: report[0].movies,
                  xCategories: report[0].movies.map((mv) => mv.movie.name),
                  text: 'Doanh thu của phim',
                }}
              />
            </Box>
            <Box flex={1}>
              <ColumnChart
                data={{
                  data: report[0].rooms,
                  xCategories: report[0].rooms.map((r) => r.room.name),
                  text: 'Doanh thu của phòng',
                }}
              />
            </Box>
            <Box flex={1}>
              <ColumnChart
                data={{
                  data: report[0].timeSlots,
                  xCategories: report[0].timeSlots.map((t) => t.timeSlot.time),
                  text: 'Doanh thu của suất chiếu',
                }}
              />
            </Box>
          </Stack>
          <Table w="full">
            <thead>
              <Tr>
                <Th>Tiêu đề</Th>
                <Th>Số lượng</Th>
              </Tr>
            </thead>
            <tbody>
              {extractObjectKeys(report[0]).map((r) => {
                const value = report[0] as any;

                return (
                  <Box as="tr" key={r}>
                    <Td>{getTitle(r)}</Td>
                    <Td>{formatPrice(r, value[r])}</Td>
                  </Box>
                );
              })}
            </tbody>
          </Table>
        </>
      )}
    </Stack>
  );
};
