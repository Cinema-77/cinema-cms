import {
  Badge,
  Box,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  Spinner,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { useRooms } from '..';
import { MenuListRoom } from '../components/MenuList';

import { Table, Td, Th, Tr } from '@/components';
import { SiteHeader } from '@/components/Layout';

interface RoomListProps {
  children?: React.ReactNode;
}

const colorBadge: any = {
  '2D': 'gray',
  '3D': 'purple',
  IMAX: 'red',
};

export const RoomList: React.FC<RoomListProps> = () => {
  const bg = useColorModeValue('gray.900', 'white');
  const color = useColorModeValue('white', 'gray.900');
  const roomsQuery = useRooms();

  // console.log(colorBadge['2D'])
  return (
    <>
      <SiteHeader
        menuName="Room List"
        heading={`Room`}
        showButton={
          <Button
            as={Link}
            to="/room/createRoom"
            leftIcon={<MdAdd />}
            backgroundColor={bg}
            color={color}
            fontWeight="medium"
            _hover={{ bg: 'gray.700' }}
            _active={{
              bg: 'gray.800',
              transform: 'scale(0.95)',
            }}
          >
            New Room
          </Button>
        }
      >
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>Room List</BreadcrumbLink>
        </BreadcrumbItem>
      </SiteHeader>

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
            {roomsQuery.isLoading ? (
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
                    <Th>Name</Th>
                    <Th>Screen</Th>
                    <Th>Row Number</Th>
                    <Th>Seat In Row</Th>
                    <Th width="50px"></Th>
                  </Tr>
                </thead>
                <tbody>
                  {roomsQuery.data?.values.rooms.map((room) => {
                    const name = room.screen?.name;
                    return (
                      <Box as="tr" key={room._id}>
                        <Td>{`Phòng ${room.name}`}</Td>
                        <Td>
                          <Badge fontSize="1em" colorScheme={colorBadge[name]}>
                            {name}
                          </Badge>
                        </Td>
                        <Td>{room.rowNumber}</Td>
                        <Td>{room.seatsInRow}</Td>
                        <Td>
                          <MenuListRoom roomId={room._id} />
                        </Td>
                      </Box>
                    );
                  })}
                </tbody>
              </Table>
            )}
          </Box>
        </Stack>
      </Flex>
    </>
  );
};
