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
  Spinner,
  Badge,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { UseQueryResult } from 'react-query';

import { useCreateShowTime } from '../api/createShowtimes';
import { useMovies } from '../api/getFormatMovie';
import { ShowTimesList, TimeSlotCreate } from '../components';
import { TimeStamp } from '../type';

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
import {
  colorBadge,
  RoomByTRespone,
  TimeSlot,
  useRoomsByMovie,
  useTimeSlots,
} from '@/features/room';
import { useAuth } from '@/lib/auth';

interface ShowTimesCreateProps {
  children?: React.ReactNode;
}

export type ShowTimesValues = {
  date?: string;
  dateStart: string;
  dateEnd: string;
  movieId: string;
  cinemaId: string;
  showTimes: TimeStamp[];
};

export const ShowTimesCreate: React.FC<ShowTimesCreateProps> = () => {
  const [idMovie, setIdMovie] = useState('');
  const timeSlotQuery = useTimeSlots();
  const moviesQuery = useMovies();
  const roomsByMovieQuery = useRoomsByMovie({ config: { enabled: !!idMovie }, idMovie });

  const { user } = useAuth();

  const onChangeMovie = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setIdMovie(value);
  };

  const createShowTimeMutation = useCreateShowTime();

  return (
    <Box overflowX="scroll">
      <SiteHeader menuName="Lịch chiếu" heading={`Tạo lịch chiếu `}>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>Lịch chiếu mới</BreadcrumbLink>
        </BreadcrumbItem>
      </SiteHeader>

      <Flex justifyContent="flex-start">
        <Stack
          backgroundColor="white"
          maxWidth="1000px"
          px={8}
          py={12}
          shadow={[null, 'md']}
          spacing={4}
          w="100%"
          alignItems="center"
          flexShrink={0}
        >
          {moviesQuery.isLoading ? (
            <Flex justifyContent="center">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Flex>
          ) : (
            <>
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
                    const times = data.showTimes.filter((t) => Boolean(t.roomId) !== false);
                    const newShowTimes = {
                      ...data,
                      showTimes: times,
                      cinemaId: user?.cinema._id as string,
                    };
                    await createShowTimeMutation.mutateAsync({ data: newShowTimes });
                  }}
                >
                  {({ register, formState, setValue }) => (
                    <Stack spacing={4} direction="column">
                      <Flex alignItems="center" justifyContent="space-between">
                        <Stack direction="column" flex={1}>
                          <SingleSelect registration={register('date')} label="Ngày tạo" />
                          {moviesQuery.data && (
                            <SelectField
                              label="Phim"
                              placeholder="Chọn 1 bộ phim"
                              registration={register('movieId')}
                              error={formState.errors['movieId']}
                              options={moviesQuery.data?.values?.movies.map(({ name, _id }) => ({
                                label: name,
                                value: _id,
                              }))}
                              onChanging={onChangeMovie}
                            />
                          )}
                        </Stack>
                        <Center flexShrink={0} mx={3} height="50px">
                          <Divider orientation="vertical" />
                        </Center>
                        <Stack direction="column" flex={1}>
                          <SingleSelect
                            registration={register('dateStart')}
                            label="Từ"
                            setValues={setValue}
                            nameToSet="dateStart"
                            sizeOfTimeStamp={
                              roomsByMovieQuery && roomsByMovieQuery.data?.values.rooms.length
                            }
                          />
                          <SingleSelect
                            registration={register('dateEnd')}
                            label="Đến"
                            setValues={setValue}
                            nameToSet="dateEnd"
                            sizeOfTimeStamp={
                              roomsByMovieQuery && roomsByMovieQuery.data?.values.rooms.length
                            }
                          />
                        </Stack>
                      </Flex>

                      {timeSlotQuery.data && (
                        <TimeSlotList
                          listTime={timeSlotQuery.data.values?.timeSlots}
                          register={register}
                          roomsByMovieQuery={roomsByMovieQuery}
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
                        isLoading={createShowTimeMutation.isLoading}
                      >
                        Tạo lịch chiếu
                      </Button>
                    </Stack>
                  )}
                </Form>
              </Box>
            </>
          )}
        </Stack>
        <Stack
          backgroundColor="white"
          maxWidth="1200px"
          minWidth="800px"
          px={8}
          py={12}
          shadow={[null, 'md']}
          spacing={4}
          alignItems="center"
          flex={1}
        >
          <ShowTimesList />
        </Stack>
      </Flex>
    </Box>
  );
};

interface TimeSlotListProps {
  children?: React.ReactNode;
  listTime: TimeSlot[];
  register: UseFormRegister<ShowTimesValues>;
  roomsByMovieQuery: UseQueryResult<RoomByTRespone, unknown>;
}

export const TimeSlotList: React.FC<TimeSlotListProps> = ({
  listTime,
  register,
  roomsByMovieQuery,
}) => {
  const compareTime = (a: TimeSlot, b: TimeSlot) => {
    if (a.time > b.time) {
      return 1;
    }
    if (a.time < b.time) {
      return -1;
    }
    return 0;
  };

  if (!roomsByMovieQuery) {
    return null;
  }

  if (roomsByMovieQuery.isLoading) {
    return (
      <Flex justifyContent="center">
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      </Flex>
    );
  }

  if (!roomsByMovieQuery?.data?.values?.rooms.length)
    return (
      <Box
        role="list"
        aria-label="comments"
        backgroundColor="white"
        textColor="gray.500"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        height="40"
      >
        <Heading as="h4" size="xl">
          Không có phòng được tìm thấy
        </Heading>
      </Box>
    );
  return (
    <Flex justifyContent="center">
      <Stack
        backgroundColor="white"
        borderRadius={[0, 8]}
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
                <Th>Phòng</Th>
                <Th>Màn hình</Th>
                <Th>Suất chiếu</Th>
                <Th>Ngày</Th>
              </Tr>
            </thead>
            <tbody>
              {roomsByMovieQuery.data?.values?.rooms.map((room, index) => (
                <Box as="tr" key={room._id}>
                  <Td>
                    <CheckBoxField
                      registration={register(`showTimes.${index}.roomId`)}
                      value={room._id}
                      name={room.name}
                      colorScheme="cyan"
                      size="lg"
                    />
                  </Td>
                  <Td>
                    <Badge colorScheme={colorBadge[room.screen.name]}>{room.screen.name}</Badge>
                  </Td>
                  <Td>
                    <CheckBoxFieldGroup
                      registration={register(`showTimes.${index}.times`)}
                      options={listTime.sort(compareTime).map(({ time, _id }) => ({
                        label: time,
                        value: _id,
                      }))}
                    />
                  </Td>
                  <Td>
                    <VStack spacing={4} align="stretch">
                      <Flex flex="1" alignItems="center">
                        <Heading as="h6" size="xs" flex="1">
                          Từ
                        </Heading>

                        <Box>
                          <SingleSelect registration={register(`showTimes.${index}.dateStart`)} />
                        </Box>
                      </Flex>
                      <Flex flex="1" alignItems="center">
                        <Heading as="h6" size="xs" flex="1">
                          Đến
                        </Heading>
                        <Box>
                          <SingleSelect registration={register(`showTimes.${index}.dateEnd`)} />
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
