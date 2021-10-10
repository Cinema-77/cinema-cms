import {
  Box,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Stack,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';

import { TimeSlotCreate } from '../components/TimeSlotCreate';

import {
  CheckBoxField,
  CheckBoxFieldGroup,
  Form,
  SelectField,
  SingleSelect,
  SiteHeader,
  Table,
  Td,
  Th,
  Tr,
} from '@/components';
import { TimeSlot, useTimeSlots } from '@/features/room';

interface ShowTimesCreateProps {
  children?: React.ReactNode;
}

interface TimeStamp {
  roomId: string;
  timeSlotsId: string[];
  dateStart: string;
  dateEnd: string;
}

export type ShowTimesValues = {
  roomId: string;
  premiereId: string;
  date: string;
  dateStart: string;
  dateEnd: string;
  timeStamp: TimeStamp[];
};

export const ShowTimesCreate: React.FC<ShowTimesCreateProps> = () => {
  const timeSlotQuery = useTimeSlots();

  return (
    <>
      <SiteHeader menuName="Showtimes" heading={`Create a new Showtimes`}>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>New Showtimes</BreadcrumbLink>
        </BreadcrumbItem>
      </SiteHeader>

      <Flex justifyContent="center">
        <Stack
          backgroundColor="white"
          maxWidth="100%"
          px={8}
          py={12}
          shadow={[null, 'md']}
          spacing={4}
          w="100%"
          alignItems="center"
        >
          <TimeSlotCreate />
          <Box
            width="100%"
            margin="auto"
            border="1px"
            borderColor="gray.200"
            borderStyle="solid"
            padding="5"
          >
            <Form<ShowTimesValues>
              onSubmit={async (data) => {
                console.log(data);
              }}
            >
              {({ register, formState }) => (
                <Stack spacing={4} direction="column">
                  <Flex alignItems="center" justifyContent="space-between">
                    <Stack direction="column" flex={1}>
                      <SingleSelect registration={register('date')} label="Date Create" />
                      <SelectField
                        label="Premiere"
                        registration={register('premiereId')}
                        error={formState.errors['premiereId']}
                        options={[
                          { name: 'King Kong', code: '2D' },
                          { name: 'King Kong', code: '3D' },
                        ].map((d) => ({
                          label: `${d.name} - ${d.code}`,
                          value: d.code,
                        }))}
                      />
                    </Stack>
                    <Center flexShrink={0} mx={3} height="50px">
                      <Divider orientation="vertical" />
                    </Center>
                    <Stack direction="column" flex={1}>
                      <SingleSelect registration={register('dateStart')} label="From" />
                      <SingleSelect registration={register('dateEnd')} label="To" />
                    </Stack>
                  </Flex>

                  {timeSlotQuery.data && (
                    <TimeSlotList
                      listTime={timeSlotQuery.data.values.timeSlots}
                      register={register}
                    />
                  )}

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
                    // isLoading={cinemaUpdateMutation.isLoading}
                  >
                    Create Showtimes
                  </Button>
                </Stack>
              )}
            </Form>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

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
        <Box>
          <Table w="full">
            <thead>
              <Tr>
                <Th>Room</Th>
                <Th>Time Slot</Th>
                <Th>Date</Th>
              </Tr>
            </thead>
            <tbody>
              {[...Array(2)].map((_, index) => (
                <Box as="tr" key={index}>
                  <Td>
                    <CheckBoxField
                      registration={register(`timeStamp.${index}.roomId`)}
                      value="1122"
                      name="P1"
                      colorScheme="cyan"
                      size="lg"
                    />
                  </Td>
                  <Td maxWidth="220px">
                    <CheckBoxFieldGroup
                      registration={register(`timeStamp.${index}.timeSlotsId`)}
                      options={listTime.sort(compareTime).map(({ time }) => time)}
                    />
                  </Td>
                  <Td maxWidth="200px">
                    <VStack spacing={4} align="stretch">
                      <Flex flex="1" alignItems="center">
                        <Heading as="h6" size="xs" flex="1">
                          From
                        </Heading>

                        <Box>
                          <SingleSelect registration={register(`timeStamp.${index}.dateStart`)} />
                        </Box>
                      </Flex>
                      <Flex flex="1" alignItems="center">
                        <Heading as="h6" size="xs" flex="1">
                          To
                        </Heading>
                        <Box>
                          <SingleSelect registration={register(`timeStamp.${index}.dateEnd`)} />
                        </Box>
                      </Flex>
                    </VStack>
                  </Td>
                </Box>
              ))}
            </tbody>
          </Table>
        </Box>
      </Stack>
    </Flex>
  );
};
