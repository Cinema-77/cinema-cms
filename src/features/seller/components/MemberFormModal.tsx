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
  phoneNumber: string;
};

export const MemberFormModal: React.FC<any> = () => {
  const { openModal, closeModal, fetchMember, isLoading } = useSellerStore();

  return (
    <Modal onClose={closeModal} isOpen={openModal} isCentered>
      <ModalOverlay />
      <ModalContent>
        <Form<PhoneValue>
          onSubmit={async ({ phoneNumber }) => {
            await fetchMember(phoneNumber);
            closeModal();
          }}
        >
          {({ register, formState }) => (
            <>
              <ModalHeader>Khách hàng thành viên</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Stack spacing={4}>
                  <InputField
                    type="text"
                    label="Nhập số điện thoại khách hàng"
                    registration={register('phoneNumber')}
                    error={formState.errors['phoneNumber']}
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
