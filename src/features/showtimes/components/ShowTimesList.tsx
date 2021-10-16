import { Badge, Box, Button, Flex, Stack, Heading, Spinner } from '@chakra-ui/react';
import React from 'react';
// import { MdAdd } from 'react-icons/md';
// import { Link } from 'react-router-dom';

import { useShowTimes } from '../api/getShowtimes';

import { Table, Td, Th, Tr } from '@/components';

interface ShowTimeListProps {
  children?: React.ReactNode;
}

export const ShowTimesList: React.FC<ShowTimeListProps> = () => {
  const showTimesQuery = useShowTimes({ data: { dateStart: '11/1/2021', dateEnd: '11/7/2021' } });

  if (!showTimesQuery.data?.showTimes?.length) {
    return null;
  }

  console.log(showTimesQuery.data);
  return (
    <Box width="100%">
      <Flex justifyContent="space-between" alignItems="center">
        <Heading as="h1">List ShowTimes</Heading>
        <Stack spacing={3} direction="row">
          <Button colorScheme="cyan" variant="outline">
            Now
          </Button>
          <Button
            color="white"
            // bg="gray.900"
            variant="solid"
            // _hover={{ bg: 'gray.700' }}
            // _active={{
            //   bg: 'gray.800',
            //   transform: 'scale(0.95)',
            // }}
            colorScheme="cyan"
          >
            Next
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
            ) : (
              <Table w="full">
                <thead>
                  <Tr>
                    <Th>Day</Th>
                    <Th>Time</Th>
                    <Th>Room</Th>
                    <Th>Movie</Th>
                  </Tr>
                </thead>
                <tbody>
                  {showTimesQuery.data.showTimes.map((a: any) => (
                    <Box as="tr" key={a._id}>
                      <Td>{a.date}</Td>
                      <Td>
                        <Badge fontSize="1em">{a.timeSlot.time}</Badge>
                      </Td>
                      <Td>{a.room.name}</Td>
                      <Td>P2</Td>
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
