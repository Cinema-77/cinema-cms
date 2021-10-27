import {
  Box,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  Stack,
  Tag,
  Text,
  Button,
  Image,
  Badge,
  Radio,
  RadioGroup,
  SimpleGrid,
  Input,
  Checkbox,
  Spinner,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import * as React from 'react';
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { SiteHeader } from '@/components';
import { SITE_MODAL_TYPES } from '@/constants';
import {
  Ticket,
  useTicketsByShowTimes,
  mapToShowtimeDetails,
  CustomerInfo,
  SeatList,
  MemberFormModal,
  BonusFormModal,
} from '@/features/seller';
import { ModalType, useSellerStore } from '@/stores/seller';

interface TParams {
  _id: string;
}
interface SellerTicketProps extends RouteComponentProps<TParams> {
  session: any;
}

export const getModal = (modalType: ModalType) => {
  switch (modalType) {
    case SITE_MODAL_TYPES.MEMBER_FORM:
      return <MemberFormModal />;
    case SITE_MODAL_TYPES.BONUS_FORM:
      return <BonusFormModal />;
    default:
      return undefined;
  }
};

const SellerTicket: React.FC<SellerTicketProps> = (props) => {
  const { match } = props;
  const { isLoading, data } = useTicketsByShowTimes({ showtimesId: match.params._id });
  const { modalType, setModal, step, nextStep, previousStep } = useSellerStore();
  const [selectedSeats, setSelectedSeats] = React.useState<Ticket[]>([]);

  if (isLoading) {
    return (
      <Flex justifyContent="center">
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      </Flex>
    );
  }

  if (!data?.values) {
    return null;
  }

  const { showTimeDetail: detail } = data.values;
  const showTimeDetail = mapToShowtimeDetails(detail);

  return (
    <Box>
      <SiteHeader menuName="Lịch chiếu" heading={`Chi tiết lịch chiếu `}>
        <BreadcrumbItem>
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
                {/*Seet List */}
                <SeatList
                  seats={[]}
                  selectedSeats={selectedSeats}
                  setSelectedSeats={setSelectedSeats}
                />

                {/*Screen */}

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
                      <Radio colorScheme="cyan" value="nl">
                        Nguời lớn
                      </Radio>
                      <Radio colorScheme="cyan" value="sv">
                        Sinh viên
                      </Radio>
                      <Radio colorScheme="cyan" value="te" defaultChecked>
                        Trẻ em
                      </Radio>
                    </SimpleGrid>
                  </RadioGroup>
                  <FormControl id="first-name" mt={3}>
                    <FormLabel>Giá vé</FormLabel>
                    <Input defaultValue="60.000,00 VNĐ" isReadOnly />
                  </FormControl>
                </Box>

                <Box>
                  <Heading as="h5" fontWeight="500" fontSize="md" my={3}>
                    Thành viên
                  </Heading>
                  <Checkbox onChange={() => setModal(SITE_MODAL_TYPES.MEMBER_FORM)}>
                    Khách hàng thành viên
                  </Checkbox>

                  {/* {MemberPopUp} */}

                  <CustomerInfo
                    name="test"
                    point="30"
                    newPoint="2"
                    setModal={() => setModal(SITE_MODAL_TYPES.BONUS_FORM)}
                  />
                </Box>
              </SimpleGrid>
            </Box>
            {/*Movie Detail  */}
            <Box w="30%" background="gray.100" p={3}>
              <Box>
                <Image
                  boxSize="200px"
                  objectFit="cover"
                  src={showTimeDetail.moviePoster}
                  alt={showTimeDetail.movieName}
                  margin="0 auto"
                />
                <Heading as="h4" fontSize="md" textTransform="uppercase" mt={4}>
                  {showTimeDetail.movieName}
                </Heading>
                <Box display="flex" alignItems="flex-start" my={5} flexDirection="column">
                  <Badge colorScheme="cyan" variant="solid">
                    C{showTimeDetail.movieLimitAge}
                  </Badge>
                  {showTimeDetail.movieLimitAge > 17 && (
                    <Text color="red" fontSize="md">
                      (*) Phim dành cho khán giả từ 18 tuổi trở lên
                    </Text>
                  )}
                </Box>
                <Stack spacing={2}>
                  <Box paddingBottom="8px" borderBottom="1px solid">
                    <b>Rạp : </b> Movieer Tân Phú
                  </Box>
                  <Box paddingBottom="8px" borderBottom="1px solid">
                    <b>Suất chiếu : </b> {`${showTimeDetail.time} ${showTimeDetail.date}`}
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
                    <Button
                      leftIcon={<BsArrowLeft />}
                      colorScheme="cyan"
                      color="white"
                      isDisabled={step === 1}
                      onClick={previousStep}
                    >
                      Quay lại
                    </Button>
                    <Button
                      rightIcon={<BsArrowRight />}
                      colorScheme="cyan"
                      color="white"
                      onClick={nextStep}
                    >
                      Tiếp tục
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </Stack>
        </Stack>
      </Flex>
      {getModal(modalType)}
    </Box>
  );
};

export const SellerTicketWithRouter = withRouter(SellerTicket);
