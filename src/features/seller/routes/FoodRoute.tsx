import { Box, Input, Flex, IconButton, useNumberInput } from '@chakra-ui/react';
import * as React from 'react';
import { HiMinusCircle, HiPlusCircle } from 'react-icons/hi';

import { Table, Tr, Th, Td } from '@/components';

interface FoodRouteProps {
  name?: string;
}

export const FoodRoute: React.FC<FoodRouteProps> = () => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 1,
    defaultValue: 0,
    min: 1,
    max: 4,
    name: 'quantity',
  });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps({ readOnly: true });
  return (
    <Table w="full">
      <thead>
        <Tr>
          <Th>Combo</Th>
          <Th>Số lượng</Th>
          <Th>Giá(VNĐ)</Th>
          <Th>Tổng(VNĐ)</Th>
          <Th width="50px"></Th>
        </Tr>
      </thead>
      <tbody>
        <Box as="tr">
          <Td>stest</Td>
          <Td>
            <Flex>
              <IconButton
                aria-label="Search database"
                icon={<HiMinusCircle />}
                colorScheme="white"
                variant="ghost"
                {...dec}
              />
              <Input maxWidth="100px" mx={3} textAlign="center" {...input} />
              <IconButton
                aria-label="Search database"
                icon={<HiPlusCircle />}
                colorScheme="white"
                variant="ghost"
                {...inc}
              />
            </Flex>
          </Td>
          <Td>test</Td>
          <Td>test</Td>
        </Box>
      </tbody>
    </Table>
  );
};
