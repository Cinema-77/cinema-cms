import { Box, Heading } from '@chakra-ui/layout';
import * as React from 'react';

import { Table, Tr, Th, Td } from '@/components/Table';
import { formatNumber } from '@/utils/format';
import { isEmptyObject } from '@/utils/object';

interface RevenueDetailProps {
  type?: string;
  data: any;
}

export const RevenueDetail: React.FC<RevenueDetailProps> = ({ type, data }) => {
  if (isEmptyObject(data)) return null;

  const { statistical, movie, room, timeSlot } = data;

  const getHeading = () => {
    switch (type) {
      case 'Movie':
        return `Phim ${movie.name}`;
      case 'Room':
        return `Phòng ${room.name}`;
      case 'Time':
        return `Suất chiếu ${timeSlot.time}`;
      default:
        return '';
    }
  };

  return (
    <Box>
      <Heading as="h3" fontSize="20px" my={4}>
        {getHeading()}
      </Heading>

      <Table w="full">
        <thead>
          <Tr>
            <Th>Tiêu đề</Th>
            <Th>Số lượng</Th>
            <Th>Doanh thu</Th>
          </Tr>
        </thead>
        <tbody>
          <Tr>
            <Td>{statistical.ticket.adult.name}</Td>
            <Td>{statistical.ticket.adult.count}</Td>
            <Td>{formatNumber(statistical.ticket.adult.price * statistical.ticket.adult.count)}</Td>
          </Tr>
          <Tr>
            <Td>{statistical.ticket.child.name}</Td>
            <Td>{statistical.ticket.child.count}</Td>
            <Td>{formatNumber(statistical.ticket.child.price * statistical.ticket.child.count)}</Td>
          </Tr>
          <Tr>
            <Td>{statistical.ticket.student.name}</Td>
            <Td>{statistical.ticket.student.count}</Td>
            <Td>
              {formatNumber(statistical.ticket.student.price * statistical.ticket.student.count)}
            </Td>
          </Tr>
          {statistical.food.combo.map((combo: any) => (
            <Tr key={combo._id}>
              <Td>Thức ăn {combo.name}</Td>
              <Td> {combo.count}</Td>
              <Td>{formatNumber(combo.price * combo.count)}</Td>
            </Tr>
          ))}
          <Tr>
            <Td>Tổng tiền vé</Td>
            <Td></Td>
            <Td>{formatNumber(statistical.ticket.total)}</Td>
          </Tr>
          <Tr>
            <Td>Tổng tiền vé khuyến mãi</Td>
            <Td></Td>
            <Td>{formatNumber(statistical.ticket.totalPromotion)}</Td>
          </Tr>
          <Tr>
            <Td>Tổng tiền thức ăn</Td>
            <Td></Td>
            <Td>{formatNumber(statistical.food.total)}</Td>
          </Tr>
          <Tr>
            <Td>Tổng tiền thức ăn khuyến mãi</Td>
            <Td></Td>
            <Td>{formatNumber(statistical.ticket.totalPromotion)}</Td>
          </Tr>
          <Tr>
            <Td>Tổng cộng</Td>
            <Td></Td>
            <Td>{formatNumber(statistical.totalPrice)}</Td>
          </Tr>
        </tbody>
      </Table>
    </Box>
  );
};
