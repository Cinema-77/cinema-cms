import { Box, Flex, Stack, VStack, Heading } from '@chakra-ui/react';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';

import { ShowTimesValues } from '..';

import { CheckBoxField, CheckBoxFieldGroup, SingleSelect, Table, Td, Th, Tr } from '@/components';
import { TimeSlot } from '@/features/room';

interface TimeSlotListProps {
  children?: React.ReactNode;
  listTime: TimeSlot[];
  register: UseFormRegister<ShowTimesValues>;
}

export const TimeSlotList: React.FC<TimeSlotListProps> = ({ listTime, register }) => {
  const compareTime = (a: TimeSlot, b: TimeSlot) => {
    if (a.time > b.time) {
      return 1;
    }
    if (a.time < b.time) {
      return -1;
    }
    return 0;
  };
  return (
    <Flex justifyContent="center">
      <Stack
        backgroundColor="white"
        borderRadius={[0, 8]}
        maxWidth="1000px"
        px={8}
        py={12}
        shadow={[null, 'md']}
        spacing={4}
        w="100%"
      >
        <Box overflowX="scroll">
          <Table w="full">
            <thead>
              <Tr>
                <Th>Room</Th>
                <Th>Time Slot</Th>
                <Th>Date</Th>
              </Tr>
            </thead>
            <tbody>
              <Box as="tr">
                <Td>
                  <CheckBoxField
                    registration={register('roomId')}
                    name="P1"
                    colorScheme="cyan"
                    size="lg"
                  />
                </Td>
                <Td maxWidth="220px">
                  <CheckBoxFieldGroup
                    registration={register('timeSlotsId')}
                    options={listTime.sort(compareTime).map(({ time }) => time)}
                  />
                </Td>
                <Td maxWidth="200px">
                  <VStack spacing={4} align="stretch">
                    <Flex flex="1" alignItems="center" flexDirection="row">
                      <Heading as="h6" size="xs" mr={2}>
                        From
                      </Heading>
                      <SingleSelect registration={register('date')} />
                    </Flex>
                    <Flex flex="1" alignItems="center" flexDirection="row">
                      <Heading as="h6" size="xs" mr={2}>
                        To
                      </Heading>
                      <SingleSelect registration={register('date')} />
                    </Flex>
                  </VStack>
                </Td>
              </Box>
            </tbody>
          </Table>
        </Box>
      </Stack>
    </Flex>
  );
};
