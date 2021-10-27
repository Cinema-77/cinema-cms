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
} from '@chakra-ui/react';
import React from 'react';

import { Form, InputField } from '@/components';
import { useSellerStore } from '@/stores/seller';

type PhoneValue = {
  phone: string;
};

export const MemberFormModal: React.FC<any> = () => {
  const { openModal, closeModal } = useSellerStore();

  return (
    <Modal onClose={closeModal} isOpen={openModal} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Khách hàng thành viên</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Form<PhoneValue>
            onSubmit={async (data) => {
              console.log(data);
            }}
          >
            {({ register, formState }) => (
              <Stack spacing={4}>
                <InputField
                  type="text"
                  label="Nhập số điện thoại khách hàng"
                  registration={register('phone')}
                  error={formState.errors['phone']}
                />
              </Stack>
            )}
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="cyan"
            type="submit"
            // isLoading={timeSlotMutation.isLoading}
            color="white"
            mr={3}
          >
            Lưu
          </Button>
          <Button onClick={closeModal}>Trở lại</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
