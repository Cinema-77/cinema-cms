import {
  Box,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  Stack,
  Switch,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';

import { TimeSlotCreate } from '../components/TimeSlotCreate';
import { TimeSlotList } from '../components/TimeSlotList';

import { Form, SelectField } from '@/components';
import { RangeSelect, SingleSelect } from '@/components/DatePicker';
import { SiteHeader } from '@/components/Layout';
import { useTimeSlots } from '@/features/room';

interface ShowTimesCreateProps {
  children?: React.ReactNode;
}

export type ShowTimesValues = {
  roomId: string;
  premiereId: string;
  timeSlotsId: string[];
  date: string;
};

export const ShowTimesCreate: React.FC<ShowTimesCreateProps> = () => {
  const { isOpen, onToggle } = useDisclosure();
  const timeSlotQuery = useTimeSlots();

  return (
    <>
      <SiteHeader menuName="Showtimes" heading={`Create a new Showtimes`}>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>New Showtimes</BreadcrumbLink>
        </BreadcrumbItem>
      </SiteHeader>

      <Flex justifyContent="center">
        <Stack
          backgroundColor="white"
          borderRadius={[0, 8]}
          maxWidth="100%"
          px={8}
          py={12}
          shadow={[null, 'md']}
          spacing={4}
          w="100%"
          alignItems="center"
        >
          <TimeSlotCreate />
          <Box
            width="100%"
            margin="auto"
            border="1px"
            borderColor="gray.200"
            borderStyle="solid"
            padding="5"
          >
            <Form<ShowTimesValues>
              onSubmit={async (data) => {
                console.log(data);
              }}
            >
              {({ register, formState }) => (
                <Stack spacing={4} direction="column">
                  <Flex justifyContent="space-between" direction="row" alignItems="center">
                    <Text as="label" fontSize="md" fontWeight="500">
                      Change pick type
                    </Text>
                    <Switch
                      id="change-type-date"
                      colorScheme="green"
                      size="md"
                      onChange={onToggle}
                    />
                  </Flex>

                  {isOpen ? <RangeSelect /> : <SingleSelect registration={register('date')} />}

                  <SelectField
                    label="Premiere"
                    registration={register('premiereId')}
                    error={formState.errors['premiereId']}
                    options={[
                      { name: 'King Kong', code: '2D' },
                      { name: 'King Kong', code: '3D' },
                    ].map((d) => ({
                      label: `${d.name} - ${d.code}`,
                      value: d.code,
                    }))}
                  />

                  {timeSlotQuery.data && (
                    <TimeSlotList
                      listTime={timeSlotQuery.data.values.timeSlots}
                      register={register}
                    />
                  )}

                  <Button
                    backgroundColor="cyan.400"
                    color="white"
                    fontWeight="medium"
                    type="submit"
                    _hover={{
                      backgroundColor: 'cyan.700',
                    }}
                    maxWidth="200px"
                    alignSelf="flex-end"
                    // isLoading={cinemaUpdateMutation.isLoading}
                  >
                    Create Showtimes
                  </Button>
                </Stack>
              )}
            </Form>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};
