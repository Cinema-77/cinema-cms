import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Stack,
  Switch,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import FocusLock from 'react-focus-lock';
import { z } from 'zod';

import { Form, InputField } from '@/components';
import { useCreateTimeSlot } from '@/features/room';
interface TimeSlotCreateProps {
  children?: React.ReactNode;
}

type TimeValues = {
  time: string;
};

const schema = z.object({
  time: z
    .string()
    .nonempty({ message: 'time field is required' })
    .regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, 'time is invalid'),
});

export const TimeSlotCreate: React.FC<TimeSlotCreateProps> = () => {
  const timeSlotMutation = useCreateTimeSlot();
  const { onToggle, isOpen } = useDisclosure();

  return (
    <>
      <Flex
        justifyContent="space-between"
        direction="row"
        alignItems="center"
        maxWidth="600px"
        minWidth="100%"
      >
        <Text as="label" fontSize="md" fontWeight="500">
          Wanna add more time ?
        </Text>
        <Switch id="change-type-date" colorScheme="green" size="md" onChange={onToggle} />
      </Flex>
      {isOpen && (
        <Box
          maxWidth="600px"
          width="100%"
          margin="auto"
          border="1px"
          borderColor="gray.200"
          borderStyle="solid"
          padding="5"
        >
          <FocusLock returnFocus persistentFocus={false}>
            <Form<TimeValues, typeof schema>
              onSubmit={async (data) => {
                await timeSlotMutation.mutateAsync(data);
              }}
              schema={schema}
            >
              {({ register, formState }) => (
                <Stack spacing={4}>
                  <InputField
                    type="text"
                    label="Add time"
                    registration={register('time')}
                    error={formState.errors['time']}
                  />
                  <ButtonGroup d="flex" justifyContent="flex-end">
                    <Button
                      colorScheme="cyan"
                      type="submit"
                      isLoading={timeSlotMutation.isLoading}
                      color="white"
                    >
                      Save
                    </Button>
                  </ButtonGroup>
                </Stack>
              )}
            </Form>
          </FocusLock>
        </Box>
      )}
    </>
  );
};
