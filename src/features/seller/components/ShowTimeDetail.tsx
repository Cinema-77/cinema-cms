import { Box, Img, Heading, Badge, Stack, Button, Text } from '@chakra-ui/react';
import React from 'react';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

import { mapToShowtimeDetails, SeatType } from '@/features/seller';
import { ShowTimesDetail } from '@/features/showtimes';
import { formatNumber } from '@/utils/format';

interface ShowTimeDetailProps {
  detail: ShowTimesDetail;
  step: number;
  nextStep: () => void;
  previousStep: () => void;
  selectedSeats: SeatType[];
}

export const ShowTimeDetail: React.FC<ShowTimeDetailProps> = (props) => {
  const { detail, step, nextStep, previousStep, selectedSeats } = props;
  const showTimeDetail = mapToShowtimeDetails(detail);

  const getInvoiceTotal = (seats: SeatType[]) =>
    seats.reduce((previousValue, seat) => previousValue + seat.price, 0);
  const getNameSeats = (seats: SeatType[]) => seats.map((seat) => seat.seatName).join(', ');

  return (
    <>
      <Box>
        <Img
          src={showTimeDetail.moviePoster}
          alt={showTimeDetail.movieName}
          rounded={4}
          loading="lazy"
          htmlHeight="300px"
          htmlWidth="250px"
        />

        <Heading as="h4" fontSize="md" textTransform="uppercase" mt={4}>
          {showTimeDetail.movieName}
        </Heading>
        <Box display="flex" alignItems="flex-start" my={5} flexDirection="column">
          <Badge colorScheme="cyan" variant="solid">
            C{showTimeDetail.movieLimitAge}
          </Badge>
          <Text color="red" fontSize="md">
            (*) Phim dành cho khán giả từ {showTimeDetail.movieLimitAge} tuổi trở lên
          </Text>
        </Box>
        <Stack spacing={2}>
          <Box paddingBottom="8px" borderBottom="1px solid">
            <b>Rạp : </b> Movieer Tân Phú
          </Box>
          <Box paddingBottom="8px" borderBottom="1px solid">
            <b>Suất chiếu : </b> {`${showTimeDetail.time} ${showTimeDetail.date}`}
          </Box>
          <Box paddingBottom="8px" borderBottom="1px solid">
            <b>Combo : </b>
          </Box>
          <Box paddingBottom="8px" borderBottom="1px solid">
            <b>Ghế : </b>
            {getNameSeats(selectedSeats)}
          </Box>
          <Box>
            Tổng:
            <Text as="span" fontSize="xl" fontWeight="500" ml={2}>
              {formatNumber(getInvoiceTotal(selectedSeats))} VNĐ
            </Text>
          </Box>
          <Stack spacing={2} direction="row">
            <Button
              leftIcon={<BsArrowLeft />}
              colorScheme="cyan"
              color="white"
              isDisabled={step === 1}
              onClick={previousStep}
            >
              Quay lại
            </Button>
            <Button
              rightIcon={<BsArrowRight />}
              colorScheme="cyan"
              color="white"
              onClick={nextStep}
            >
              Tiếp tục
            </Button>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};
