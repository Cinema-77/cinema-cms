import { CheckBoxField, Form, InputField, SelectField } from '@/components';
import { InputNumberField } from '@/components/Form/InputNumberField';
import { SiteHeader } from '@/components/Layout';
import { BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/breadcrumb';
import { Button } from '@chakra-ui/button';
import { Box, Flex, Stack } from '@chakra-ui/layout';
import React from 'react';
import { useTimeSlots } from '..';
import { useScreens } from '../api/getScreens';

interface RoomProps {}

type RoomValues = {
  name: string;
  rowNumber: number;
  seatsInRow: number;
  screenId: string;
  cinemaId: string;
  timeSlotsId: string[];
};

export const CreateRoom: React.FC<RoomProps> = () => {
  const timeSlotQuery = useTimeSlots();
  const screensQuery = useScreens();

  if (timeSlotQuery.isLoading && screensQuery.isLoading) {
    return null;
  }

  return (
    <>
      <SiteHeader menuName="Rooms" heading={`Create a new Room`}>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>New Room</BreadcrumbLink>
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
            <Form<RoomValues>
              onSubmit={async (data) => {
                console.log(data);
              }}
              // options={{}}
            >
              {({ register, formState }) => (
                <Stack spacing={5} direction="column">
                  <InputField
                    type="text"
                    label="Tên Phòng"
                    error={formState.errors['name']}
                    registration={register('name')}
                  />
                  <SelectField
                    label="Màn hình"
                    registration={register('screenId')}
                    error={formState.errors['screenId']}
                    options={screensQuery.data?.values.screens.map(({ _id, name }) => ({
                      label: name,
                      value: _id,
                    }))}
                  />
                  <InputNumberField
                    label="Số hàng ghế"
                    max={20}
                    min={10}
                    defaultValue={15}
                    error={formState.errors['rowNumber']}
                    registration={register('rowNumber')}
                  />
                  <InputNumberField
                    label="Số ghế mỗi hàng"
                    max={15}
                    min={8}
                    defaultValue={10}
                    error={formState.errors['seatsInRow']}
                    registration={register('seatsInRow')}
                  />
                  {timeSlotQuery.data && (
                    <CheckBoxField
                      label="Time"
                      registration={register('timeSlotsId')}
                      options={timeSlotQuery.data?.values.timeSlots.map(({ time }) => time)}
                      more
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
                    Tạo phòng
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
