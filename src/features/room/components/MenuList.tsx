import {
  Menu,
  MenuButton,
  IconButton,
  MenuItem,
  MenuList,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useRef } from 'react';
import { FiMoreVertical, FiEdit2, FiTrash2 } from 'react-icons/fi';

import { useDeleteRoom } from '../api/deleteRoom';
interface MenuListRoomProps {
  roomId: string;
}

export const MenuListRoom: React.FC<MenuListRoomProps> = ({ roomId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef: any = useRef();
  const deleteRoomMutation = useDeleteRoom();
  const onDelete = async () => {
    await deleteRoomMutation.mutateAsync({ roomId });
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<FiMoreVertical />}
        variant="outline"
      />
      <MenuList>
        <MenuItem icon={<FiEdit2 />} command="⌘T">
          Edit
        </MenuItem>
        <MenuItem icon={<FiTrash2 />} command="⌘N" onClick={onOpen}>
          Delete
          <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
            <AlertDialogOverlay />
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Room
              </AlertDialogHeader>
              <AlertDialogBody>
                Are you sure? This will also delete all feedback left on the site. You can't undo
                this action afterwards.
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button fontWeight="bold" colorScheme="red" onClick={onDelete} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
