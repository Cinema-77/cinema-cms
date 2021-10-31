import { Box, Img, Heading, Badge, Stack, Button, Text, useToast } from '@chakra-ui/react';
import React from 'react';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { useHistory } from 'react-router';

import { mapToShowtimeDetails, SeatType, ComboItem, useBuyTicket } from '@/features/seller';
import { ShowTimesDetail } from '@/features/showtimes';
import { formatNumber } from '@/utils/format';

interface ShowTimeDetailProps {
  detail: ShowTimesDetail;
  step: number;
  nextStep: () => void;
  previousStep: () => void;
  selectedSeats: SeatType[];
  selectedCombos: ComboItem[];
  clearData: () => void;
}

export const ShowTimeDetail: React.FC<ShowTimeDetailProps> = (props) => {
  const { detail, step, nextStep, previousStep, selectedSeats, selectedCombos, clearData } = props;
  const showTimeDetail = mapToShowtimeDetails(detail);
  const toast = useToast();
  const router = useHistory();
  const buyTicketMutation = useBuyTicket();

  const getInvoiceTotal = (seats: SeatType[]) =>
    seats.reduce((previousValue, seat) => previousValue + seat.price, 0);
  const getComboTotal = (combos: ComboItem[]) =>
    combos.reduce((sum, crItem) => sum + crItem.price * crItem.quantity, 0);
  const getNameSeats = (seats: SeatType[]) => seats.map((seat) => seat.seatName).join(', ');
  const getNameCombo = (combos: ComboItem[]) =>
    combos.map((combo) => `${combo.name} (${combo.quantity})`).join(', ');

  const total = getInvoiceTotal(selectedSeats) + getComboTotal(selectedCombos);

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
            <b>Suất chiếu : </b> {`${showTimeDetail.time} | ${showTimeDetail.date}`}
          </Box>
          <Box paddingBottom="8px" borderBottom="1px solid">
            <b>Combo : </b>
            {getNameCombo(selectedCombos)}
          </Box>
          <Box paddingBottom="8px" borderBottom="1px solid">
            <b>Ghế : </b>
            {getNameSeats(selectedSeats)}
          </Box>
          <Box>
            Tổng:
            <Text as="span" fontSize="xl" fontWeight="500" ml={2}>
              {formatNumber(total)} VNĐ
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
            {step === 1 ? (
              <Button
                rightIcon={<BsArrowRight />}
                colorScheme="cyan"
                color="white"
                onClick={() => {
                  if (!selectedSeats.length) {
                    toast({
                      title: `Vui lòng chọn vé trước`,
                      status: 'info',
                      isClosable: true,
                      position: 'top-right',
                    });
                  } else {
                    nextStep();
                  }
                }}
              >
                Tiếp tục
              </Button>
            ) : (
              <Button
                colorScheme="cyan"
                color="white"
                onClick={async () => {
                  const data = {
                    combos: selectedCombos,
                    data: selectedSeats,
                    payment: {
                      type: '0',
                    },
                    showTimeDetailId: showTimeDetail._id,
                    userId: '613e17d875cc9e00375d5ce5',
                  };
                  await buyTicketMutation.mutateAsync(data);
                  router.push(`/seller/bookTicket/${showTimeDetail._id}`);
                  clearData();
                  // setTimeout(
                  //   () =>
                  //     window.location.assign(
                  //       `http://localhost:3000/seller/bookTicket/${showTimeDetail._id}`,
                  //     ),
                  //   2000,
                  // );
                }}
                isLoading={buyTicketMutation.isLoading}
              >
                Thanh toán
              </Button>
            )}
          </Stack>
        </Stack>
      </Box>
    </>
  );
};
