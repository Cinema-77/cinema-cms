import { Button, Flex, Heading, Stack, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import * as z from 'zod';

import { InputField } from '@/components/Form';
import { loginWithEmailAndPassword } from '@/features/auth';
import { useAuth } from '@/lib/auth';

interface AuthProps {
  children: React.ReactNode;
}

type LoginValues = {
  username: string;
  password: string;
};

const schema = z.object({
  username: z.string().nonempty({ message: 'Please enter your email' }).email(),
  password: z.string().nonempty({ message: 'Please enter a password.' }),
});

export const Auth: React.FC<AuthProps> = () => {
  const { user, login } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  if (user) {
    return <Redirect to="/dashboard" />;
  }

  const onLogin: SubmitHandler<LoginValues> = async (data: LoginValues) => {
    setIsLoggingIn(!isLoggingIn);
    const { values, errors } = await loginWithEmailAndPassword(data);
    if (errors) {
      toast({ title: `Login Failed`, position: 'top-right', isClosable: true, status: 'error' });
      setIsLoggingIn(false);
    } else {
      login(values);
      setIsLoggingIn(false);
    }
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center" background="gray.200">
      <Stack
        as="form"
        backgroundColor="white"
        borderRadius={[0, 8]}
        maxWidth="400px"
        onSubmit={handleSubmit(onLogin)}
        px={8}
        py={12}
        shadow={[null, 'md']}
        spacing={4}
        w="100%"
      >
        <Heading mb={6}>Sign in to CMS </Heading>
        <InputField
          label="Email Address"
          registration={register('username')}
          aria-label="Email Address"
          error={errors['username']}
        />
        <InputField
          label="Password"
          registration={register('password')}
          aria-label="Password"
          type="password"
          error={errors['password']}
        />
        <Button
          id="login"
          type="submit"
          backgroundColor="cyan.400"
          color="white"
          isLoading={isLoggingIn}
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
          Sign in
        </Button>
      </Stack>
    </Flex>
  );
};
