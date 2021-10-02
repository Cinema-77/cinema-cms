import { Table, Td, Th, Tr } from '@/components';
import { SiteHeader } from '@/components/Layout';
import {
  Box,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { MenuListRoom } from '../components/MenuList';

interface RoomListProps {}

export const RoomList: React.FC<RoomListProps> = () => {
  const bg = useColorModeValue('gray.900', 'white');
  const color = useColorModeValue('white', 'gray.900');
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
            <Table w="full">
              <thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Screen</Th>
                  <Th>Row Number</Th>
                  <Th>List Time</Th>
                  <Th width="50px"></Th>
                </Tr>
              </thead>
              <tbody>
                <Box as="tr">
                  <Td>Phòng A1</Td>
                  <Td>2D</Td>
                  <Td>10</Td>
                  <Td>10</Td>
                  <Td>
                    <MenuListRoom roomId={`22`} />
                  </Td>
                </Box>
              </tbody>
            </Table>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};
