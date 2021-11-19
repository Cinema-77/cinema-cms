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
  useToast,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import * as React from 'react';
import { UseFormRegister } from 'react-hook-form';

import {
  CheckBoxField,
  Form,
  SelectField,
  SingleSelect,
  SiteHeader,
  Table,
  Td,
  Th,
  Tr,
} from '@/components';
import { ROUTES } from '@/constants';
import { colorBadge, Room } from '@/features/room';
import {
  useCreateShowTime,
  useMovies,
  ShowTimesList,
  TimeSlotCreate,
  CheckBoxTimeGroup,
  TimeStamp,
} from '@/features/showtimes';
import { useAuth } from '@/lib/auth';
import { Authorization, ROLES } from '@/lib/authorization';
import { useRoomsByMovieStore } from '@/stores/timeSlot';
import { isEmptyObject } from '@/utils/object';

export type ShowTimesValues = {
  date?: string;
  dateStart: string;
  dateEnd: string;
  movieId: string;
  cinemaId: string;
  showTimes: TimeStamp[];
};

export const ShowTimesCreate = () => {
  const moviesQuery = useMovies();
  const { listRoomByMovie, fetchRooms, checkedTimes, reset, loading } = useRoomsByMovieStore();

  const { user } = useAuth();
  const toast = useToast();

  const onChangeMovie = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    return value ? fetchRooms(value) : reset();
  };

  const createShowTimeMutation = useCreateShowTime();

  return (
    <Box overflowX="scroll">
      <Authorization
        forbiddenFallback={<div>Only manager can view this.</div>}
        allowedRoles={[ROLES.MANAGER]}
      >
        <SiteHeader
          menuName="Lịch chiếu"
          menuHref={ROUTES.SHOWTIMES_CREATE}
          heading={`Tạo lịch chiếu `}
        >
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
            <Tabs variant="enclosed" width="full">
              <TabList>
                <Tab>Tạo lịch chiếu </Tab>
                <Tab>Doanh sách lịch chiếu</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
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
                            console.log(data);
                            if (data['showTimes'] === undefined || isEmptyObject(data.showTimes)) {
                              toast({
                                title: 'Vui lòng chọn lịch chiếu',
                                position: 'top-right',
                                isClosable: true,
                                status: 'info',
                              });
                              return;
                            }
                            const times = data.showTimes.filter((t) => Boolean(t.roomId) !== false);
                            const newShowTimes = {
                              ...data,
                              showTimes: times,
                              cinemaId: user?.cinema._id as string,
                            };
                            await createShowTimeMutation.mutateAsync({ data: newShowTimes });
                          }}
                          options={{
                            defaultValues: {
                              date: '11/19/2021',
                              dateStart: '11/20/2021',
                            },
                          }}
                        >
                          {({ register, formState, setValue }) => (
                            <Stack spacing={4} direction="column">
                              <Flex alignItems="center" justifyContent="space-between">
                                <Stack direction="column" flex={1}>
                                  <SingleSelect
                                    registration={register('date')}
                                    label="Ngày tạo"
                                    defaultValue="11/19/2021"
                                  />
                                  {moviesQuery.data && (
                                    <SelectField
                                      label="Phim"
                                      placeholder="Chọn 1 bộ phim"
                                      registration={register('movieId')}
                                      error={formState.errors['movieId']}
                                      options={moviesQuery.data?.values?.movies.map(
                                        ({ name, _id }) => ({
                                          label: name,
                                          value: _id,
                                        }),
                                      )}
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
                                    sizeOfTimeStamp={listRoomByMovie.length}
                                  />
                                  <SingleSelect
                                    registration={register('dateEnd')}
                                    label="Đến"
                                    setValues={setValue}
                                    nameToSet="dateEnd"
                                    sizeOfTimeStamp={listRoomByMovie.length}
                                  />
                                </Stack>
                              </Flex>

                              <TimeSlotList
                                register={register}
                                rooms={listRoomByMovie}
                                checkedTimes={checkedTimes}
                                isLoading={loading}
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
                </TabPanel>
                <TabPanel>
                  <ShowTimesList />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Stack>
        </Flex>
      </Authorization>
    </Box>
  );
};

interface TimeSlotListProps {
  register: UseFormRegister<ShowTimesValues>;
  rooms: Room[];
  checkedTimes: ({
    _id,
    roomName,
    screenName,
  }: {
    _id: string;
    roomName: string;
    screenName: string;
  }) => void;
  isLoading: boolean;
}

export const TimeSlotList: React.FC<TimeSlotListProps> = (props) => {
  const { register, rooms, checkedTimes, isLoading } = props;

  if (isLoading) {
    return (
      <Flex justifyContent="center">
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      </Flex>
    );
  }

  if (!rooms.length)
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
              {rooms.map((room, index) => (
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
                    <CheckBoxTimeGroup
                      registration={register(`showTimes.${index}.times`)}
                      options={room.timeSlots.map(({ time, _id, disabled }) => ({
                        label: time,
                        value: _id,
                        disable: disabled,
                      }))}
                      roomName={room.name}
                      screenName={room.screen.name}
                      onCheck={checkedTimes}
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
