import { Box, Button, Flex, Heading, Radio, RadioGroup, Stack, Select } from '@chakra-ui/react';
import React from 'react';

import { Form, SingleSelect, Table, Td, Th, Tr } from '@/components';
import { REVENUE_TYPE } from '@/constants';
import { getRevenue, ColumnChart, RevenueDetail } from '@/features/revenue';
import { formatNumber } from '@/utils/format';

type RevenueValues = {
  cinemaId: string;
  dateStart: string;
};

enum EReportType {
  Full = 'Full',
  Movie = 'Movie',
  Room = 'Room',
  Time = 'Time',
}
interface RevenueByDateFormProps {
  cinemaId: string;
}

export const RevenueByDateForm: React.FC<RevenueByDateFormProps> = ({ cinemaId }) => {
  const [report, setReport] = React.useState<any>([]);
  const [reportDetail, setReportDetail] = React.useState({});
  const [reportType, setReportType] = React.useState<string>(EReportType.Full);
  const [loading, setLoading] = React.useState<boolean>(false);

  const hasRevenue = report.length > 0;

  const onChangeReportType = (value: string) => {
    setReport([]);
    setReportType(value);
  };

  const onGetDetail = (id: string, type: string) => {
    switch (type) {
      case EReportType.Movie: {
        const rpDetail = report.find((r: any) => r.movie._id === id);
        return rpDetail ? setReportDetail(rpDetail) : undefined;
      }
      case EReportType.Room: {
        const rpDetail = report.find((r: any) => r.room._id === id);
        return rpDetail ? setReportDetail(rpDetail) : undefined;
      }
      case EReportType.Time: {
        const rpDetail = report.find((r: any) => r.timeSlot._id === id);
        return rpDetail ? setReportDetail(rpDetail) : undefined;
      }
      default:
        undefined;
    }
  };

  return (
    <Stack spacing={5} width="full">
      <Stack direction="column" justifyContent="center" mx={4}>
        <Heading fontSize="20px">Thống kê doanh thu </Heading>
      </Stack>
      <Box>
        <Form<RevenueValues>
          onSubmit={async (data) => {
            setLoading(true);
            const values = { ...data, cinemaId };
            const response = await getRevenue(values, reportType);
            console.log(response);
            setReport(response);
            setLoading(false);
          }}
        >
          {({ register, setValue }) => (
            <Flex alignItems="center" justifyContent="space-between">
              <Stack spacing={3}>
                <SingleSelect
                  registration={register('dateStart')}
                  setValues={setValue}
                  nameToSet="dateStart"
                />
                <RadioGroup
                  defaultValue={EReportType.Full}
                  onChange={onChangeReportType}
                  value={reportType}
                >
                  <Stack direction="row" spacing={5}>
                    {REVENUE_TYPE.map((r) => (
                      <Radio colorScheme="cyan" value={r.id} key={r.id}>
                        {r.name}
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
              </Stack>
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
                isLoading={loading}
              >
                Thống kê
              </Button>
            </Flex>
          )}
        </Form>
      </Box>

      {hasRevenue && (
        <>
          {reportType === EReportType.Full && (
            <>
              <ColumnChart
                data={{
                  data: report[0],
                  xCategories: ['Doanh thu tiền vé', 'Doanh thu thức ăn', 'Doanh thu cả hai'],
                  text: 'Doanh thu ',
                }}
              />
              <Table w="full">
                <thead>
                  <Tr>
                    <Th>Tiêu đề</Th>
                    <Th>Số lượng</Th>
                    <Th>Doanh thu</Th>
                  </Tr>
                </thead>
                <tbody>
                  <Box as="tr">
                    <Td>{report[0].ticket.adult.name}</Td>
                    <Td>{report[0].ticket.adult.count}</Td>
                    <Td>
                      {formatNumber(report[0].ticket.adult.price * report[0].ticket.adult.count)}
                    </Td>
                  </Box>
                  <Box as="tr">
                    <Td>{report[0].ticket.child.name}</Td>
                    <Td>{report[0].ticket.child.count}</Td>
                    <Td>
                      {formatNumber(report[0].ticket.child.price * report[0].ticket.child.count)}
                    </Td>
                  </Box>
                  <Box as="tr">
                    <Td>{report[0].ticket.student.name}</Td>
                    <Td>{report[0].ticket.student.count}</Td>
                    <Td>
                      {formatNumber(
                        report[0].ticket.student.price * report[0].ticket.student.count,
                      )}
                    </Td>
                  </Box>
                  {report[0].food.combo.map((combo: any) => (
                    <Box as="tr" key={combo._id}>
                      <Td>Thức ăn {combo.name}</Td>
                      <Td> {combo.count}</Td>
                      <Td>{formatNumber(combo.price * combo.count)}</Td>
                    </Box>
                  ))}
                  <Box as="tr">
                    <Td>Tổng tiền vé</Td>
                    <Td></Td>
                    <Td>{formatNumber(report[0].ticket.total)}</Td>
                  </Box>
                  <Box as="tr">
                    <Td>Tổng tiền vé khuyến mãi</Td>
                    <Td></Td>
                    <Td>{formatNumber(report[0].ticket.totalPromotion)}</Td>
                  </Box>
                  <Box as="tr">
                    <Td>Tổng tiền thức ăn</Td>
                    <Td></Td>
                    <Td>{formatNumber(report[0].food.total)}</Td>
                  </Box>
                  <Box as="tr">
                    <Td>Tổng tiền thức ăn khuyến mãi</Td>
                    <Td></Td>
                    <Td>{formatNumber(report[0].ticket.totalPromotion)}</Td>
                  </Box>
                  <Box as="tr">
                    <Td>Tổng cộng</Td>
                    <Td></Td>
                    <Td>{formatNumber(report[0].totalPrice)}</Td>
                  </Box>
                </tbody>
              </Table>
            </>
          )}

          {reportType === EReportType.Movie && (
            <>
              <ColumnChart
                data={{
                  data: report,
                  xCategories: report.map((value: any) => value.movie.name),
                  text: 'Doanh thu ',
                  type: EReportType.Movie,
                }}
              />
              <Box maxWidth="200px" my="5">
                <Select
                  placeholder="Chọn phim"
                  onChange={(e) => onGetDetail(e.target.value, EReportType.Movie)}
                >
                  {report.map((rp: any) => (
                    <option key={rp.movie._id} value={rp.movie._id}>
                      {rp.movie.name}
                    </option>
                  ))}
                </Select>
              </Box>
              <RevenueDetail data={reportDetail} type={EReportType.Movie} />
            </>
          )}
          {reportType === EReportType.Room && (
            <>
              <ColumnChart
                data={{
                  data: report,
                  xCategories: report.map((value: any) => value.room.name),
                  text: 'Doanh thu ',
                  type: EReportType.Room,
                }}
              />
              <Box maxWidth="200px" my="5">
                <Select
                  placeholder="Chọn phòng"
                  onChange={(e) => onGetDetail(e.target.value, EReportType.Room)}
                >
                  {report.map((rp: any) => (
                    <option key={rp.room._id} value={rp.room._id}>
                      {rp.room.name}
                    </option>
                  ))}
                </Select>
              </Box>
              <RevenueDetail data={reportDetail} type={EReportType.Room} />
            </>
          )}
          {reportType === EReportType.Time && (
            <>
              <ColumnChart
                data={{
                  data: report,
                  xCategories: report.map((value: any) => value.timeSlot.time),
                  text: 'Doanh thu',
                  type: EReportType.Time,
                }}
              />
              <Box maxWidth="200px" my="5">
                <Select
                  placeholder="Chọn suất chiếu"
                  onChange={(e) => onGetDetail(e.target.value, EReportType.Time)}
                >
                  {report.map((rp: any) => (
                    <option key={rp.timeSlot._id} value={rp.timeSlot._id}>
                      {rp.timeSlot.time}
                    </option>
                  ))}
                </Select>
              </Box>
              <RevenueDetail data={reportDetail} type={EReportType.Time} />
            </>
          )}
        </>
      )}
    </Stack>
  );
};
