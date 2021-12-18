import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import React from 'react';

interface StaffWarningModalProps {
  onCancel: () => void;
  onConfirm: () => void;
  visible: boolean;
}

export const StaffWarningModal: React.FC<StaffWarningModalProps> = (props) => {
  const { onCancel, onConfirm, visible } = props;
  const cancelRef: any = React.useRef();

  return (
    <AlertDialog isOpen={visible} leastDestructiveRef={cancelRef} onClose={onCancel}>
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader fontSize="lg" fontWeight="bold">
          Xoá
        </AlertDialogHeader>
        <AlertDialogBody>
          Bạn có chắc không ? Điều này sẽ xoá nhân viên hiện tại và bạn không thể khôi phục lại được
          ?
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onCancel}>
            Huỷ bỏ
          </Button>
          <Button fontWeight="bold" colorScheme="red" onClick={onConfirm} ml={3}>
            Xoá
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
