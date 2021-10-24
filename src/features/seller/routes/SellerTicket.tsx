import {
  Box,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  List,
  ListItem,
  Stack,
  Tag,
  Text,
  Button,
  Image,
  Badge,
  Radio,
  RadioGroup,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  NumberInput,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import * as React from 'react';
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { SiteHeader } from '@/components';
import { keyChar } from '@/constants';

interface SellerTicketProps extends RouteComponentProps {
  session: any;
}

const SellerTicket: React.FC<SellerTicketProps> = (props) => {
  const { match } = props;
  const arrayChar = keyChar.split('');
  //get movie by id
  console.log(match);

  const mapToButton = () => {
    const arraySeat = [];
    for (let i = 0; i < 10; i += 1) {
      const nameRow = String.fromCharCode(i + 65);
      const arrayName = [];
      for (let j = 1; j <= 10; j += 1) {
        arrayName.push({ isChecked: false, nameSeat: nameRow + j, status: nameRow == 'A' ? 1 : 0 });
      }
      arraySeat.push({ nameRow, arrayName });
    }
    return arraySeat;
  };

  const [arrayButton, setArrayButton] = React.useState(mapToButton());

  const onSelectSeat = (nameRow: string, nameSeat: string) => {
    const selectedRow = arrayButton.find((b) => b.nameRow == nameRow);
    if (selectedRow) {
      const selectedSeat = selectedRow.arrayName.find((seat) => seat.nameSeat == nameSeat);
      if (selectedSeat) {
        selectedSeat.isChecked = !selectedSeat.isChecked;
        setArrayButton([...arrayButton]);
      }
    }
  };

  const getColorScheme = (button: any) => {
    if (button.status == 1) {
      return 'red';
    }
    if (button.isChecked) {
      return 'cyan';
    }
    return undefined;
  };

  return (
    <Box>
      <SiteHeader menuName="Lịch chiếu" heading={`Chi tiết lịch chiếu `}>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>Suất chiếu phim</BreadcrumbLink>
        </BreadcrumbItem>
      </SiteHeader>
      <Flex justifyContent="flex-start">
        <Stack
          backgroundColor="white"
          px={12}
          py={12}
          shadow={[null, 'md']}
          spacing={4}
          w="100%"
          alignItems="center"
          flexShrink={0}
        >
          <Stack spacing={3} w="100%" direction="row">
            {/*Select seat  */}
            <Box w="70%">
              <Heading as="h2" fontSize="xl" textTransform="uppercase" mb={3}>
                Chọn ghế :
              </Heading>
              {/*Seet Wrapper */}
              <Box px={2}>
                <Box>
                  <Stack spacing={2} alignItems="center" direction="column-reverse">
                    {arrayButton.map((b, index) => (
                      <List display="flex" key={`${index}`}>
                        <Button as={ListItem} width="20px" variant="outline">
                          {b.nameRow}
                        </Button>
                        <Stack as={List} mx={3} spacing={2} direction="row">
                          {b.arrayName.map((s, index) => (
                            <Button
                              key={`${index} + a`}
                              width="20px"
                              colorScheme={getColorScheme(s)}
                              isDisabled={s.status == 1}
                              color={s.isChecked ? 'white' : undefined}
                              onClick={() => onSelectSeat(b.nameRow, s.nameSeat)}
                            >
                              {index + 1}
                            </Button>
                          ))}
                        </Stack>
                        <Button as={ListItem} width="20px" variant="outline">
                          {arrayChar[index]}
                        </Button>
                      </List>
                    ))}
                  </Stack>
                </Box>

                <Box
                  border="3px"
                  borderColor="gray.500"
                  fontSize="md"
                  width="35%"
                  textAlign="center"
                  margin="30px auto"
                  paddingBottom="6px"
                  borderBottom="solid"
                >
                  Màn hình
                </Box>
                <Stack spacing={3} direction="row" justifyContent="center">
                  <Box display="flex">
                    <Tag mr={3} colorScheme="cyan" />
                    <Text>Ghế thể chọn</Text>
                  </Box>
                  <Box display="flex">
                    <Tag mr={3} colorScheme="red" />
                    <Text>Ghế đã bán</Text>
                  </Box>
                  <Box display="flex">
                    <Tag mr={3} />
                    <Text>Có thể chọn</Text>
                  </Box>
                  <Box display="flex">
                    <Tag mr={3} colorScheme="teal" />
                    <Text>Không thể chọn</Text>
                  </Box>
                </Stack>
              </Box>
              <SimpleGrid
                mt={5}
                borderTop="1px solid"
                borderColor="gray.200"
                columns={2}
                spacing={5}
              >
                <Box>
                  <Heading as="h5" fontWeight="500" fontSize="md" my={3}>
                    Loại vé
                  </Heading>
                  <RadioGroup defaultValue="1">
                    <SimpleGrid columns={2} spacing={5}>
                      <Radio colorScheme="red" value="nl">
                        Nguời lớn
                      </Radio>
                      <Radio colorScheme="green" value="sv">
                        Sinh viên
                      </Radio>
                      <Radio colorScheme="orange" value="te" defaultChecked>
                        Trẻ em
                      </Radio>
                    </SimpleGrid>
                  </RadioGroup>
                  <FormControl id="first-name" mt={3}>
                    <FormLabel>Giá vé</FormLabel>
                    <Input defaultValue="60.000,00 VNĐ" />
                  </FormControl>
                </Box>
                <Box>
                  <Heading as="h5" fontWeight="500" fontSize="md" my={3}>
                    Thành viên
                  </Heading>
                  <Checkbox defaultIsChecked>Khách hàng thành viên</Checkbox>
                  <FormControl id="first-name" mt={3} display="flex">
                    <FormLabel>Tên khách hàng</FormLabel>
                    <Input defaultValue="Nguyễn Văn A" />
                  </FormControl>
                  <FormControl id="first-name" mt={3} display="flex">
                    <FormLabel>Điểm tích luỹ</FormLabel>
                    <Input defaultValue="30" />
                  </FormControl>
                  <FormControl id="first-name" mt={3} display="flex">
                    <FormLabel>Điểm cộng thêm</FormLabel>
                    <Input defaultValue="2" />
                  </FormControl>
                  <FormControl id="first-name" my={3}>
                    <FormLabel>Đổi vé miễn phí</FormLabel>
                    <NumberInput step={1} defaultValue={1} min={1} max={5}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                  <Button colorScheme="cyan" color="white">
                    Đổi vé
                  </Button>
                </Box>
              </SimpleGrid>
            </Box>
            {/*Movie Detail  */}
            <Box w="30%" background="gray.100" p={3}>
              <Box>
                <Image
                  boxSize="200px"
                  objectFit="cover"
                  src="https://images.unsplash.com/photo-1579762689878-ce41dd75ad98?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80"
                  alt="Dan Abramov"
                  margin="0 auto"
                />
                <Heading as="h4" fontSize="md" textTransform="uppercase" mt={4}>
                  Lật mặt 48h
                </Heading>
                <Box display="flex" alignItems="flex-start" my={5} flexDirection="column">
                  <Badge colorScheme="cyan" variant="solid">
                    C18
                  </Badge>
                  <Text color="red" fontSize="md">
                    (*) Phim dành cho khán giả từ 18 tuổi trở lên
                  </Text>
                </Box>
                <Stack spacing={2}>
                  <Box paddingBottom="8px" borderBottom="1px solid">
                    <b>Rạp : </b> Movieer Tân Phú
                  </Box>
                  <Box paddingBottom="8px" borderBottom="1px solid">
                    <b>Suất chiếu : </b> 20:00 | Thứ 5, 21/10/2021
                  </Box>
                  <Box paddingBottom="8px" borderBottom="1px solid">
                    <b>Combo : </b>
                  </Box>
                  <Box paddingBottom="8px" borderBottom="1px solid">
                    <b>Ghế : </b>
                  </Box>
                  <Box>
                    Tổng:
                    <Text as="span" fontSize="xl" fontWeight="500">
                      55,000 VNĐ
                    </Text>
                  </Box>
                  <Stack spacing={2} direction="row">
                    <Button leftIcon={<BsArrowLeft />} colorScheme="cyan" color="white">
                      Quay lại
                    </Button>
                    <Button rightIcon={<BsArrowRight />} colorScheme="cyan" color="white">
                      Tiếp tục
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </Stack>
        </Stack>
      </Flex>
    </Box>
  );
};

export const SellerTicketWithRouter = withRouter(SellerTicket);
