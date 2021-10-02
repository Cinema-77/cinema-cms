import { CheckBoxField, Form, RadioField, SelectField } from '@/components';
import { RangeSelect, SingleSelect } from '@/components/DatePicker';
import { SiteHeader } from '@/components/Layout';
import { TimeSlot, useTimeSlots } from '@/features/room';
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
interface ShowTimesCreateProps {}

type ShowTimesValues = {
  roomId: string;
  premiereId: string;
  timeSlotsId: string[];
  date: string;
};

export const ShowTimesCreate: React.FC<ShowTimesCreateProps> = () => {
  const { isOpen, onToggle } = useDisclosure();
  const timeSlotQuery = useTimeSlots();

  const compareTime = (a: TimeSlot, b: TimeSlot) => {
    if (a.time > b.time) {
      return 1;
    }
    if (a.time < b.time) {
      return -1;
    }
    return 0;
  };
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
          maxWidth="800px"
          px={8}
          py={12}
          shadow={[null, 'md']}
          spacing={4}
          w="100%"
          alignItems="center"
        >
          <TimeSlotCreate />
          <Box
            maxWidth="600px"
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

                  <RadioField
                    label="Room"
                    registration={register('roomId')}
                    options={['Sasuke', 'Itachi', 'Naruto']}
                  />

                  <SelectField
                    label="Premiere"
                    registration={register('premiereId')}
                    error={formState.errors['premiereId']}
                    options={[]}
                  />

                  {timeSlotQuery.data && (
                    <CheckBoxField
                      label="Time"
                      registration={register('timeSlotsId')}
                      options={timeSlotQuery.data?.values.timeSlots
                        .sort(compareTime)
                        .map(({ time }) => time)}
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
