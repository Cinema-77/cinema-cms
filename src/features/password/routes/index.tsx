import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';

import { ChangePassword, ChangePasswordType } from '..';

import { InputField } from '@/components/Form';
import { Toast } from '@/utils/Toast';

const schema = z.object({
  oldPassword: z.string().nonempty({ message: 'Vui lòng nhập mật khẩu cũ' }),
  newPassword: z.string().nonempty({ message: 'Vui lòng nhập mật khẩu mới' }),
  confirmPassword: z.string().nonempty({ message: 'Vui lòng nhập lại mật khẩu' }),
});

interface PasswordProps {
  onClose: () => void;
  isOpen: boolean;
}

export const Password = ({ onClose, isOpen }: PasswordProps) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onLogin: SubmitHandler<ChangePasswordType> = async (data: ChangePasswordType) => {
    const res = await ChangePassword(data);
    if (res.success) {
      Toast(res.message, true);
      onClose();
      reset();
    } else {
      if (res.values.errors.oldPassword) {
        Toast(res.values.errors.oldPassword);
      } else if (res.values.errors.newPassword) {
        Toast(res.values.errors.newPassword);
      } else if (res.values.errors.confirmPassword) {
        Toast(res.values.errors.confirmPassword);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <Flex w="100%" background="gray.200" borderRadius={6}>
          <Stack
            as="form"
            backgroundColor="white"
            borderRadius={[0, 8]}
            onSubmit={handleSubmit(onLogin)}
            px={8}
            py={12}
            shadow={[null, 'md']}
            spacing={4}
            w="100%"
          >
            <Heading fontWeight="bold">Change Password</Heading>
            <ModalCloseButton />
            <InputField
              label="Old Password"
              registration={register('oldPassword')}
              aria-label="Old Password"
              type="password"
              error={errors['oldPassword']}
            />
            <InputField
              label="New Password"
              registration={register('newPassword')}
              aria-label="New Password"
              type="password"
              error={errors['newPassword']}
            />
            <InputField
              label="Confirm Password"
              registration={register('confirmPassword')}
              aria-label="Confirm Password"
              type="password"
              error={errors['confirmPassword']}
            />
            <Button
              id="login"
              type="submit"
              backgroundColor="cyan.400"
              color="white"
              fontWeight="medium"
              mt={4}
              h="50px"
              fontSize="lg"
              _hover={{ bg: 'cyan.700' }}
              _active={{
                bg: 'cyan.200',
                transform: 'scale(0.95)',
              }}
            >
              Change Password
            </Button>
          </Stack>
        </Flex>
      </ModalContent>
    </Modal>
  );
};
