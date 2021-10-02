import { CheckBoxField, Form, RadioField, SelectField } from '@/components';
import { RangeSelect, SingleSelect } from '@/components/DatePicker';
import { SiteHeader } from '@/components/Layout';
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

interface ShowTimesCreateProps {}

type ShowTimesValues = {
  roomId: string;
  premiereId: string;
  timeSlotsId: string[];
  date: string;
};

export const ShowTimesCreate: React.FC<ShowTimesCreateProps> = () => {
  const { isOpen, onToggle } = useDisclosure();

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
        >
          <Box maxWidth="400px" width="100%" margin="auto">
            <Form<ShowTimesValues>
              onSubmit={async (data) => {
                console.log(data);
              }}
              // options={{}}
            >
              {({ register, formState }) => (
                <Stack spacing={4} direction="column">
                  <Stack spacing={2} direction="row" alignItems="center">
                    <Text as="label" fontSize="md" fontWeight="500">
                      Change pick type
                    </Text>
                    <Switch
                      id="change-type-date"
                      colorScheme="green"
                      size="md"
                      onChange={onToggle}
                    />
                  </Stack>
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

                  <CheckBoxField
                    label="TimeSlots"
                    registration={register('timeSlotsId')}
                    options={['1:00', '2:00', '3:00']}
                  />

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
