import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Flex,
  Stack,
  useDisclosure,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ButtonGroup,
} from '@chakra-ui/react';
import * as React from 'react';
import { Redirect, useHistory } from 'react-router-dom';

import { ROUTES } from '@/constants';
import { TicketCard } from '@/features/seller';
import { useSellerStore } from '@/stores/seller';
import { isEmptyObject } from '@/utils/object';

export const PaymentComplete = () => {
  const { bills, clearBill } = useSellerStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useHistory();

  if (isEmptyObject(bills)) {
    return <Redirect to={ROUTES.SELLER} />;
  }

  return (
    <Box>
      <Flex flexDirection="column" alignItems="center">
        <Stack
          backgroundColor="white"
          px={5}
          py={5}
          shadow={[null, 'md']}
          spacing={4}
          w="50%"
          alignItems="center"
          flexShrink={0}
        >
          <Alert
            status="success"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Thanh toán thành công!
            </AlertTitle>
            <AlertDescription maxWidth="sm">Cảm ơn bạn đã đồng hành cùng Movieer.</AlertDescription>
          </Alert>
          <ButtonGroup spacing="2" width="full" justifyContent="flex-end">
            <Button onClick={onOpen} mr={3} variant="outline" colorScheme="green">
              In vé
            </Button>
            <Button
              onClick={() => {
                router.push(ROUTES.SELLER);
                clearBill();
              }}
              colorScheme="green"
            >
              Trở lại
            </Button>
          </ButtonGroup>
        </Stack>
      </Flex>

      <Modal onClose={onClose} isOpen={isOpen} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Danh sách vé</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {bills.ticketBill &&
              bills.ticketBill.data.map((bill) => (
                <TicketCard
                  key={bill.idSeat}
                  movieName={bills.movieName}
                  seatName={bill.seatName}
                  date={bills.date}
                  roomName={bills.roomName}
                  price={bill.price}
                  time={bills.time}
                />
              ))}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
