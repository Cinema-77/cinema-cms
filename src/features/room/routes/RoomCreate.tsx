import { Form, InputField, SelectField } from '@/components';
import { SiteHeader } from '@/components/Layout';
import { BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/breadcrumb';
import { Button } from '@chakra-ui/button';
import { Stack, Flex, Box, Heading, Wrap, WrapItem } from '@chakra-ui/layout';
import { Checkbox } from '@chakra-ui/react';
import React, { ChangeEvent } from 'react';

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
  const [timeSlotsId, setTimeSlotsId] = React.useState<string[]>([]);

  const onChangeTime = (e: ChangeEvent<HTMLInputElement>) => {
    const crItem = e.target.value;
    const isExistItem = timeSlotsId.find((s: string) => s === crItem);
    if (isExistItem) {
      const newTimeSlotsId = timeSlotsId.filter((s: string) => s !== isExistItem);
      setTimeSlotsId(newTimeSlotsId);
    } else {
      setTimeSlotsId([...timeSlotsId, crItem]);
    }
  };

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
                console.log({ ...data, timeSlotsId });
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
                    options={[]}
                  />
                  <InputField
                    type="text"
                    label="Số hàng ghế"
                    error={formState.errors['rowNumber']}
                    registration={register('rowNumber')}
                  />
                  <InputField
                    type="text"
                    label="Số ghế mỗi hàng"
                    error={formState.errors['seatsInRow']}
                    registration={register('seatsInRow')}
                  />
                  <Heading size="md" fontWeight="normal">
                    Khung giờ
                  </Heading>
                  <Wrap spacing={4}>
                    <WrapItem>
                      <Checkbox value="naruto" onChange={onChangeTime}>
                        1:00
                      </Checkbox>
                    </WrapItem>
                    <WrapItem>
                      <Checkbox value="sasuke" onChange={onChangeTime}>
                        2:00
                      </Checkbox>
                    </WrapItem>
                    <WrapItem>
                      <Checkbox value="kakashi" onChange={onChangeTime}>
                        3:00
                      </Checkbox>
                    </WrapItem>
                  </Wrap>
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
