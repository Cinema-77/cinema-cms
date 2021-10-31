import { Box, BreadcrumbItem, BreadcrumbLink, Flex, Stack, Spinner } from '@chakra-ui/react';
import * as React from 'react';
import { useParams } from 'react-router-dom';

import { SiteHeader } from '@/components';
import { SITE_MODAL_TYPES } from '@/constants';
import {
  useTicketsByShowTimes,
  ShowTimeDetail,
  MemberFormModal,
  BonusFormModal,
  SeatsRoute,
  FoodRoute,
} from '@/features/seller';
import { ModalType, useSellerStore } from '@/stores/seller';

interface TParams {
  _id: string;
}

export const getModal = (modalType: ModalType) => {
  switch (modalType) {
    case SITE_MODAL_TYPES.MEMBER_FORM:
      return <MemberFormModal />;
    case SITE_MODAL_TYPES.BONUS_FORM:
      return <BonusFormModal />;
    default:
      return undefined;
  }
};

export const SellerTicket = () => {
  const params: TParams = useParams();
  const ticketsByShowTimesQuery = useTicketsByShowTimes({ showtimesId: params._id });
  const {
    modalType,
    step,
    selectedSeats,
    selectedCombos,
    member,
    setModal,
    setSelectedSeats,
    nextStep,
    previousStep,
    inc,
    des,
    reset,
  } = useSellerStore();

  if (ticketsByShowTimesQuery.isLoading) {
    return (
      <Flex justifyContent="center">
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      </Flex>
    );
  }

  if (!ticketsByShowTimesQuery.data?.values) {
    return null;
  }

  return (
    <Box>
      <SiteHeader menuName="Lịch chiếu" heading={`Chi tiết lịch chiếu `}>
        <BreadcrumbItem>
          <BreadcrumbLink>Suất chiếu phim</BreadcrumbLink>
        </BreadcrumbItem>
      </SiteHeader>
      <Flex justifyContent="flex-start">
        <Stack
          backgroundColor="white"
          px={12}
          py={12}
          shadow={[null, 'md']}
          spacing={4}
          w="100%"
          alignItems="center"
          flexShrink={0}
        >
          <Stack spacing={3} w="100%" direction="row">
            {/*Select seat  */}
            <Box w="70%">
              {step == 1 && (
                <SeatsRoute
                  seats={ticketsByShowTimesQuery.data.values.tickets}
                  selectedSeats={selectedSeats}
                  setSelectedSeats={setSelectedSeats}
                  setModal={setModal}
                  member={member}
                />
              )}
              {step == 2 && (
                <FoodRoute
                  listCombo={ticketsByShowTimesQuery.data.values.combos}
                  selectedCombos={selectedCombos}
                  increaseQuantity={inc}
                  descreaseQuantity={des}
                />
              )}
            </Box>
            <Box w="30%" background="gray.100" p={3}>
              {/*Movie Detail  */}
              <ShowTimeDetail
                detail={ticketsByShowTimesQuery.data.values.showTimeDetail}
                step={step}
                nextStep={nextStep}
                previousStep={previousStep}
                selectedSeats={selectedSeats}
                selectedCombos={selectedCombos}
                clearData={reset}
              />
            </Box>
          </Stack>
        </Stack>
      </Flex>

      {getModal(modalType)}
    </Box>
  );
};
