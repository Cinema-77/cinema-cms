import { Badge, Box, Button, Flex, Stack, Heading, Spinner, SimpleGrid } from '@chakra-ui/react';
import React from 'react';

import { Table, Td, Th, Tr } from '@/components';
import { colorBadge } from '@/features/room';
import { useShowTimes } from '@/features/showtimes';
import {
  getCurrentMonday,
  getCurrentSunday,
  getDay,
  getNextMonday,
  getNextSunday,
  getPrevMonday,
  getPrevSunday,
} from '@/utils/format';

interface ShowTimeListProps {
  children?: React.ReactNode;
}

export const ShowTimesList: React.FC<ShowTimeListProps> = () => {
  const [currentMonSun, setCurrentMonSun] = React.useState({
    mon: getCurrentMonday(),
    sun: getCurrentSunday(),
  });
  const [dataShowTimes, setDataShowTimes] = React.useState({
    dateStart: currentMonSun.mon,
    dateEnd: currentMonSun.sun,
  });

  const showTimesQuery = useShowTimes({
    data: dataShowTimes,
  });

  const onPrevWeek = () => {
    setCurrentMonSun({
      ...currentMonSun,
      mon: getPrevMonday(currentMonSun.mon),
      sun: getPrevSunday(currentMonSun.sun),
    });

    setDataShowTimes({
      dateStart: getPrevMonday(currentMonSun.mon),
      dateEnd: getPrevSunday(currentMonSun.sun),
    });
  };

  const onNextWeek = () => {
    setCurrentMonSun({
      ...currentMonSun,
      mon: getNextMonday(currentMonSun.mon),
      sun: getNextSunday(currentMonSun.sun),
    });

    setDataShowTimes({
      dateStart: getNextMonday(currentMonSun.mon),
      dateEnd: getNextSunday(currentMonSun.sun),
    });
  };

  return (
    <Box width="100%">
      <Heading as="h2" size="lg">
        Danh sách lịch chiếu - suất chiếu
      </Heading>
      <Flex justifyContent="space-between" alignItems="center" mt={2}>
        <Heading as="h5" size="md">
          {`${currentMonSun.mon} - ${currentMonSun.sun}`}
        </Heading>
        <Stack spacing={3} direction="row">
          <Button colorScheme="cyan" variant="outline" onClick={onPrevWeek}>
            Trước
          </Button>
          <Button color="white" variant="solid" colorScheme="cyan" onClick={onNextWeek}>
            Sau
          </Button>
        </Stack>
      </Flex>

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
            {showTimesQuery.isLoading ? (
              <Flex justifyContent="center">
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              </Flex>
            ) : !showTimesQuery.data?.showTimes?.length ? (
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
                  Không có lịch chiếu được tìm thấy
                </Heading>
              </Box>
            ) : (
              <Table w="full">
                <thead>
                  <Tr>
                    <Th>Thứ</Th>
                    <Th>Ngày</Th>
                    <Th>Khung giờ</Th>
                  </Tr>
                </thead>
                <tbody>
                  {showTimesQuery.data.showTimes.map((st) => (
                    <Box as="tr" key={st.date}>
                      <Td>{getDay(st.date)}</Td>
                      <Td>{st.date}</Td>
                      <Td>
                        <Stack spacing={2} direction="column">
                          {st.times.map((t, index: number) => (
                            <Stack
                              direction="row"
                              alignItems="flex-start"
                              justifyContent="space-between"
                              key={`${t.time}-${index}`}
                            >
                              <Badge fontSize="1em">{t.time}</Badge>
                              <SimpleGrid columns={[2, null, 3]} spacing="40px">
                                {t.movieRoom.map((r, index: number) => (
                                  <Box key={`${r.room.name}-${index}`}>
                                    <Badge
                                      fontSize="1em"
                                      colorScheme={colorBadge[r.room.screen.name]}
                                    >
                                      {r.room.name}
                                    </Badge>
                                    <Box>{r.movie.name}</Box>
                                  </Box>
                                ))}
                              </SimpleGrid>
                            </Stack>
                          ))}
                        </Stack>
                      </Td>
                    </Box>
                  ))}
                </tbody>
              </Table>
            )}
          </Box>
        </Stack>
      </Flex>
    </Box>
  );
};
