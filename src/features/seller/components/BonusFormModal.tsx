import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import React from 'react';

import { useSellerStore } from '@/stores/seller';

interface BonusFormModalProps {
  text?: string;
}

export const BonusFormModal: React.FC<BonusFormModalProps> = () => {
  const { openModal, closeModal } = useSellerStore();

  return (
    <Modal size="6xl" onClose={closeModal} isOpen={openModal} isCentered closeOnEsc>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Bonus Form</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Form bonus</ModalBody>
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
