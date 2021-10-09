import { BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/breadcrumb';
import { Button } from '@chakra-ui/button';
import { Box, Flex, Stack } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import React from 'react';
import * as z from 'zod';

import { useScreens } from '../api/getScreens';

import { Form, InputField, SelectField } from '@/components';
import { InputNumberField } from '@/components/Form/InputNumberField';
import { SiteHeader } from '@/components/Layout';
import { useAuth } from '@/lib/auth';
interface RoomProps {
  children?: React.ReactNode;
}

type RoomValues = {
  name: string;
  rowNumber: string;
  seatsInRow: string;
  screenId: string;
};

const schema = z.object({
  name: z.string().nonempty({ message: 'name field is required' }),
  rowNumber: z.string().nonempty().max(2),
  seatsInRow: z.string().nonempty().max(2),
  screenId: z.string(),
});

export const CreateRoom: React.FC<RoomProps> = () => {
  const screensQuery = useScreens();
  const { user } = useAuth();

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
            {screensQuery.isLoading ? (
              <Flex justifyContent="center">
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              </Flex>
            ) : (
              <Form<RoomValues, typeof schema>
                onSubmit={async (data) => {
                  const cinemaId = user?.cinema._id;
                  const rowNumber = parseInt(data.rowNumber, 10);
                  const seatsInRow = parseInt(data.seatsInRow, 10);
                  console.log({ ...data, cinemaId, rowNumber, seatsInRow });
                }}
                schema={schema}
              >
                {({ register, formState }) => (
                  <Stack spacing={5} direction="column">
                    <InputField
                      type="text"
                      label="Tên Phòng"
                      registration={register('name')}
                      error={formState.errors['name']}
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
            )}
          </Box>
        </Stack>
      </Flex>
    </>
  );
};
