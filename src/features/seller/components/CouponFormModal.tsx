import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  ModalFooter,
  Button,
  useToast,
} from '@chakra-ui/react';
import * as React from 'react';
import * as z from 'zod';

import { Form, InputField } from '@/components';
import { getCouponGift, ICoupon } from '@/features/seller';
import { useSellerStore } from '@/stores/seller';

type CouponValues = {
  code: string;
  userId: string;
};

const schema = z.object({
  code: z.string().nonempty({ message: 'Code là bắt buộc' }),
  //   .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, 'code không hợp lệ'),
});

export const CouponFormModal = () => {
  const {
    openModal,
    isLoading,
    member,
    screenId,
    selectedGifts,
    selectedSeats,
    closeModal,
    fetchCoupon,
    setLoading,
  } = useSellerStore();
  const toast = useToast();

  const validateError = (coupon: ICoupon) => {
    const messageError: string[] = [];

    const isUnvaliableTicket = coupon.gift.screenId && coupon.gift.screenId !== screenId;
    const hasGiftDiscount = selectedGifts.find((g) => g.type === 2 && coupon.gift.type === g.type); // 2 la phieu giam gia
    const ticketsGift = selectedGifts.find((g) => g.type === 0);

    if (isUnvaliableTicket) {
      messageError.push('Coupon không hợp lệ');
    }

    if (hasGiftDiscount) {
      messageError.push('Phiếu giảm giá chỉ áp dụng 1 lần');
    }

    if (ticketsGift && ticketsGift.quantity > selectedSeats.length) {
      messageError.push(`Bạn chỉ đổi được tối đa ${selectedSeats.length} vé`);
    }

    messageError.forEach((msg) =>
      toast({
        position: 'top-right',
        status: 'info',
        title: msg,
        isClosable: true,
      }),
    );

    return messageError;
  };

  return (
    <Modal onClose={closeModal} isOpen={openModal} isCentered>
      <ModalOverlay />
      <ModalContent>
        <Form<CouponValues, typeof schema>
          onSubmit={async ({ code }) => {
            setLoading(true);
            const data = { code, userId: member._id };
            const { values, success } = await getCouponGift(data);
            const hasError = validateError(values.coupon);

            if (success && !hasError.length) {
              toast({
                position: 'top-right',
                status: 'success',
                title: 'Lấy coupon thành công',
                isClosable: true,
              });
              fetchCoupon(values.coupon);
              closeModal();
            } else {
              setLoading(false);
            }
          }}
          schema={schema}
        >
          {({ register, formState }) => (
            <>
              <ModalHeader>Coupon</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Stack spacing={4}>
                  <InputField
                    type="text"
                    label="Nhập code"
                    registration={register('code')}
                    error={formState.errors['code']}
                  />
                </Stack>
              </ModalBody>
              <ModalFooter>
                <Button onClick={closeModal} mr={3}>
                  Trở lại
                </Button>
                <Button colorScheme="cyan" type="submit" isLoading={isLoading} color="white">
                  Xác nhận
                </Button>
              </ModalFooter>
            </>
          )}
        </Form>
      </ModalContent>
    </Modal>
  );
};
