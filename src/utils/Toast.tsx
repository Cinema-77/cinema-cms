import { createStandaloneToast } from '@chakra-ui/react';

export const Toast = (message: string, success?: boolean) => {
  const toast = createStandaloneToast();
  toast({
    title: message,
    status: success ? 'success' : 'error',
    isClosable: true,
    position: 'top-right',
  });
  return null;
};
