import { Box, Button, Flex, Heading, Stack, ButtonGroup } from '@chakra-ui/react';
import React from 'react';

import { Form, SingleSelect, Table, Td, Th, Tr } from '@/components';
import {
  useGetRevenueByDate,
  IRevenueData,
  getTitle,
  formatPrice,
  ColumnChart,
  IRevenueWithMovie,
  IRevenueWithRoom,
  IRevenueWithTime,
  extractObjectKeys,
} from '@/features/revenue';

type RevenueValues = {
  cinemaId: string;
  dateStart: string;
};

enum EReportType {
  All = 'All',
  Movie = 'Movie',
  Room = 'Room',
  TimeSlot = 'TimeSlot',
}
interface RevenueByDateFormProps {
  cinemaId: string;
}

export const RevenueByDateForm: React.FC<RevenueByDateFormProps> = ({ cinemaId }) => {
  const [report, setReport] = React.useState<IRevenueData[]>([]);
  const [reportType, setReportType] = React.useState<string>(EReportType.All);

  const useGetRevenueByDateMutation = useGetRevenueByDate();
  const hasRevenue = report.length > 0;
  const isActive = (type: string) => reportType === type;

  const renderReportType = () => {
    const reportTypeButton = [];

    for (const type in EReportType) {
      reportTypeButton.push(
        <Button
          key={type}
          colorScheme={isActive(type) ? 'cyan' : undefined}
          color={isActive(type) ? 'white' : undefined}
          onClick={() => setReportType(type)}
        >
          {type}
        </Button>,
      );
    }
    return reportTypeButton;
  };

  return (
    <Stack spacing={5} width="full">
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

      {hasRevenue && (
        <>
          {reportType === 'All' && (
            <>
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
              {/* <ColumnChart
                data={{
                  data: report[0],
                  xCategories: report[0].
                  text: 'Doanh thu của phim',
                }}
              /> */}
            </>
          )}
          <Box>
            <ButtonGroup variant="solid" spacing="6">
              {renderReportType()}
            </ButtonGroup>
          </Box>
          <Stack spacing={5}>
            {reportType === 'Movie' && (
              <Box flex={1}>
                <ColumnChart
                  data={{
                    data: report[0].movies,
                    xCategories: report[0].movies.map((mv) => mv.movie.name),
                    text: 'Doanh thu của phim',
                  }}
                />
                <RevenueDetail movies={report[0].movies} />
              </Box>
            )}
            {reportType === 'Room' && (
              <Box flex={1}>
                <ColumnChart
                  data={{
                    data: report[0].movies,
                    xCategories: report[0].movies.map((mv) => mv.movie.name),
                    text: 'Doanh thu của phim',
                  }}
                />
                <RevenueDetail movies={report[0].movies} />
              </Box>
            )}
            {reportType === 'TimeSlot' && (
              <Box flex={1}>
                <ColumnChart
                  data={{
                    data: report[0].timeSlots,
                    xCategories: report[0].timeSlots.map((t) => t.timeSlot.time),
                    text: 'Doanh thu của suất chiếu',
                  }}
                />
                <RevenueDetail times={report[0].timeSlots} />
              </Box>
            )}
          </Stack>
        </>
      )}
    </Stack>
  );
};

interface IRevenueDetail {
  movies?: IRevenueWithMovie[];
  rooms?: IRevenueWithRoom[];
  times?: IRevenueWithTime[];
}

const RevenueDetail = (props: IRevenueDetail) => {
  const { movies, rooms, times } = props;

  return (
    <>
      {movies &&
        movies.map((revenue, index) => {
          return (
            <>
              <Heading fontSize="20px">{revenue.movie.name}</Heading>

              <Table w="full" key={index}>
                <thead>
                  <Tr>
                    <Th>Tiêu đề </Th>
                    <Th>Số lượng</Th>
                  </Tr>
                </thead>
                <tbody>
                  <Box as="tr">
                    <Td>{getTitle('totalPriceFood')}</Td>
                    <Td>{formatPrice('totalPriceFood', revenue['totalPriceFood'])}</Td>
                  </Box>
                  <Box as="tr">
                    <Td>{getTitle('totalPriceTicket')}</Td>
                    <Td>{formatPrice('totalPriceTicket', revenue['totalPriceTicket'])}</Td>
                  </Box>
                  <Box as="tr">
                    <Td>{getTitle('totalPrice')}</Td>
                    <Td>{formatPrice('totalPrice', revenue['totalPrice'])}</Td>
                  </Box>
                </tbody>
              </Table>
            </>
          );
        })}
      {rooms &&
        rooms.map((revenue, index) => {
          return (
            <>
              <Heading fontSize="20px">{revenue.room.name}</Heading>

              <Table w="full" key={index}>
                <thead>
                  <Tr>
                    <Th>Tiêu đề </Th>
                    <Th>Số lượng</Th>
                  </Tr>
                </thead>
                <tbody>
                  <Box as="tr">
                    <Td>{getTitle('totalPriceFood')}</Td>
                    <Td>{formatPrice('totalPriceFood', revenue['totalPriceFood'])}</Td>
                  </Box>
                  <Box as="tr">
                    <Td>{getTitle('totalPriceTicket')}</Td>
                    <Td>{formatPrice('totalPriceTicket', revenue['totalPriceTicket'])}</Td>
                  </Box>
                  <Box as="tr">
                    <Td>{getTitle('totalPrice')}</Td>
                    <Td>{formatPrice('totalPrice', revenue['totalPrice'])}</Td>
                  </Box>
                </tbody>
              </Table>
            </>
          );
        })}
      {times &&
        times.map((revenue, index) => {
          return (
            <>
              <Heading fontSize="20px">{revenue.timeSlot.time}</Heading>

              <Table w="full" key={index}>
                <thead>
                  <Tr>
                    <Th>Tiêu đề </Th>
                    <Th>Số lượng</Th>
                  </Tr>
                </thead>
                <tbody>
                  <Box as="tr">
                    <Td>{getTitle('totalPriceFood')}</Td>
                    <Td>{formatPrice('totalPriceFood', revenue['totalPriceFood'])}</Td>
                  </Box>
                  <Box as="tr">
                    <Td>{getTitle('totalPriceTicket')}</Td>
                    <Td>{formatPrice('totalPriceTicket', revenue['totalPriceTicket'])}</Td>
                  </Box>
                  <Box as="tr">
                    <Td>{getTitle('totalPrice')}</Td>
                    <Td>{formatPrice('totalPrice', revenue['totalPrice'])}</Td>
                  </Box>
                </tbody>
              </Table>
            </>
          );
        })}
    </>
  );
};
