import { Flex, Box, Heading, Text, Button, Stack } from '@chakra-ui/react';
import { Avatar } from '@chakra-ui/react';
import React from 'react';
import { MdSettings, MdInfo } from 'react-icons/md';
import { CinemaType } from '..';

export const CinemaItem: React.FC<CinemaType> = (props) => {
  return (
    <Box
      border="1px"
      borderColor="gray.200"
      padding="5"
      borderRadius="8px"
      backgroundColor="white"
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
            <Heading size="lg" mb="1">
              {props.name}
            </Heading>
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
        <Button leftIcon={<MdSettings />} colorScheme="cyan" color="white" variant="solid">
          Edit
        </Button>
        <Button leftIcon={<MdInfo />} colorScheme="cyan" variant="outline">
          Details
        </Button>
      </Stack>
    </Box>
  );
};
