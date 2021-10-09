import {
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Stack,
  useColorModeValue,
  IconButton,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Avatar,
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import { MdInfo } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { CinemaType } from '..';
import { useDeleteCinema } from '../api/deleteCinema';

import { CinemaModalUpdate } from './CinemaModalUpdate';

import { useAuth } from '@/lib/auth';

export const CinemaItem: React.FC<CinemaType> = (props) => {
  const bg = useColorModeValue('white', 'gray.900');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const cancelRef: any = useRef();
  const onClose = () => setIsOpen(false);
  const deleteCinemaMutation = useDeleteCinema();
  const { user } = useAuth();

  const onDelete = async () => {
    await deleteCinemaMutation.mutateAsync({ cinemaId: props._id });
  };

  const isMine = () => {
    return user?.cinema._id === props._id;
  };
  return (
    <Box
      border="1px"
      borderColor="gray.200"
      padding="5"
      borderRadius="8px"
      backgroundColor={bg}
      mb="5"
    >
      <Flex alignItems="flex-start">
        <Box>
          <Avatar
            src="https://cdn.moveek.com/media/cache/square/5fffb30b3194c340097683.png"
            backgroundColor="#fff"
            size="lg"
          />
        </Box>
        <Box paddingX="12px">
          <Box mb="3">
            <Flex justifyContent="space-between" alignItems="center">
              <Heading size="lg" mb="1">
                {props.name}
              </Heading>
              {isMine() && (
                <IconButton
                  size="lg"
                  variant="ghost"
                  aria-label="toogle theme"
                  icon={<FiTrash />}
                  onClick={() => setIsOpen(!isOpen)}
                />
              )}
              <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                <AlertDialogOverlay />
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Delete Cinema
                  </AlertDialogHeader>
                  <AlertDialogBody>
                    Are you sure? This will also delete all showtimes and movie left on the cinema.
                    You can't undo this action afterwards.
                  </AlertDialogBody>
                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      fontWeight="bold"
                      colorScheme="red"
                      onClick={onDelete}
                      ml={3}
                      isLoading={deleteCinemaMutation.isLoading}
                    >
                      Delete
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </Flex>

            <Text fontSize="md" textColor="gray.500">
              {`${props.address.street}, ${props.address.ward}, ${props.address.district}, ${props.address.city}`}
            </Text>
          </Box>
          <Text fontSize="sm" fontWeight="medium">
            {` Xem Lịch chiếu và Mua vé ${props.name} - rạp Movieer toàn quốc dễ dàng - nhanh chóng
            tại Movieer. Rạp Movieer Nguyễn Du nằm ở đường Nguyễn Du, là rạp chiếu phim đầu tiên của
            Movieer Cinema được xây dựng với tiêu chuẩn Hollywood, có 5 phòng chiếu (1000 chỗ ngồi),
            chuẩn âm thanh Dolby 7.1. ${props.name} nằm ở khu vực rất thuận lợi cho các bạn sinh
            viên - học sinh lẫn nhân viên văn phòng. Bên trong khuôn viên còn thường xuyên tổ chức
            các sự kiện ra mắt phim và hội chợ hết sức thú vị.`}
          </Text>
        </Box>
      </Flex>
      <Stack direction="row" spacing={4} mt="4" justifyContent="flex-end">
        {isMine() && <CinemaModalUpdate {...props} />}
        <Button
          as={Link}
          to={`/cinema/detail/${props._id}`}
          leftIcon={<MdInfo />}
          colorScheme="cyan"
          variant="outline"
        >
          Details
        </Button>
      </Stack>
    </Box>
  );
};
