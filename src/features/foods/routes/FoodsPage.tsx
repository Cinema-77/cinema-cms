import { Image, Box, Flex, Spinner, Stack } from '@chakra-ui/react';

import { Table, Td, Th, Tr, SiteHeader } from '@/components';
import { ROUTES } from '@/constants';
import { useFoods, FoodCreateModal } from '@/features/foods';
import { Authorization, ROLES } from '@/lib/authorization';
import { formatNumber } from '@/utils/format';

export const FoodsPage = () => {
  const foodsQuery = useFoods();

  const spinner = (
    <Flex justifyContent="center">
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
    </Flex>
  );

  const tableFoods = (
    <Table w="full">
      <thead>
        <Tr>
          <Th>Tên</Th>
          <Th></Th>
          <Th>Unit</Th>
          <Th>Giá(VNĐ)</Th>
          <Th width="50px"></Th>
        </Tr>
      </thead>
      <tbody>
        {foodsQuery.data?.combos.map((food) => {
          return (
            <Box as="tr" key={food.name}>
              <Td paddingX={0}>
                <Image boxSize="100px" objectFit="cover" src={food.image} alt={food.name} />
              </Td>
              <Td>{food.name}</Td>

              <Td>{food.unit}</Td>
              <Td>{formatNumber(food.price)}</Td>
              <Td>{/* <MenuListRoom roomId={room._id} /> */}</Td>
            </Box>
          );
        })}
      </tbody>
    </Table>
  );

  return (
    <Authorization
      forbiddenFallback={<div>Only manager can view this.</div>}
      allowedRoles={[ROLES.MANAGER, ROLES.USER]}
    >
      <SiteHeader
        menuName="Danh sách thức ăn"
        menuHref={ROUTES.FOODS}
        heading={`Foods`}
        showButton={
          <Authorization
            forbiddenFallback={<div>Only manager can view this.</div>}
            allowedRoles={[ROLES.MANAGER]}
          >
            <FoodCreateModal />
          </Authorization>
        }
      />

      <Flex justifyContent="center">
        <Stack
          backgroundColor="white"
          borderRadius={[0, 8]}
          maxWidth="1000px"
          px={8}
          py={12}
          shadow={[null, 'md']}
          spacing={4}
          w="100%"
        >
          <Box overflowX="scroll">{foodsQuery.isLoading ? spinner : tableFoods}</Box>
        </Stack>
      </Flex>
    </Authorization>
  );
};
