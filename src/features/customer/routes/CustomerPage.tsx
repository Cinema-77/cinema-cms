import { Box, Flex, Spinner, Stack, Button, useColorModeValue } from '@chakra-ui/react';
import * as React from 'react';
import { MdAdd } from 'react-icons/md';

import { Table, Td, Th, Tr, SiteHeader, WarningModal } from '@/components';
import { CUSTOMER_FORM, ROUTES } from '@/constants';
import { AuthUser } from '@/features/auth';
import {
  CustomerFormModal,
  useCustomers,
  CustomerDropdown,
  useDeleteCustomer,
} from '@/features/customer';
import { useAuth } from '@/lib/auth';
import { Authorization, POLICIES, ROLES } from '@/lib/authorization';
import { useCustomerStore } from '@/stores/customer';

export const CustomerPage = () => {
  const customersQuery = useCustomers();
  const { user } = useAuth();
  const deleteCusomterMutation = useDeleteCustomer();
  const { onOpen } = useCustomerStore();
  const [warningDialogVisible, setWarningDialogVisible] = React.useState(false);
  const [customerId, setCustomerId] = React.useState('');
  const bg = useColorModeValue('gray.900', 'white');
  const color = useColorModeValue('white', 'gray.900');

  const onDelete = (id: string) => {
    setWarningDialogVisible(true);
    setCustomerId(id);
  };

  const hideWarningDialog = () => {
    setWarningDialogVisible(false);
  };

  const onConfirmDeleteFood = (customerId: string) => {
    deleteCusomterMutation.mutateAsync({ customerId });

    hideWarningDialog();
  };

  const spinner = (
    <Flex justifyContent="center">
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
    </Flex>
  );

  const tableCustomer = (
    <Table w="full">
      <thead>
        <Tr>
          <Th>Họ Tên</Th>
          <Th>Email</Th>
          <Th>Ngày sinh</Th>
          <Th>Giới tính</Th>
          <Th>Số điện thoại</Th>
          <Th></Th>
        </Tr>
      </thead>
      <tbody>
        {customersQuery.data?.values.users.map((customer) => {
          return (
            <Box as="tr" key={customer._id}>
              <Td>{customer.profile.fullName}</Td>
              <Td>{customer.email}</Td>
              <Td>{customer.profile.dateOfBirth}</Td>
              <Td>{customer.profile.male ? 'Nam' : 'Nữ'}</Td>
              <Td>{customer.phoneNumber}</Td>
              <Td>
                <CustomerDropdown customer={customer} onDelete={() => onDelete(customer._id)} />
              </Td>
            </Box>
          );
        })}
      </tbody>
    </Table>
  );

  return (
    <Authorization
      forbiddenFallback={<div>Chỉ có quản lý mới có quyền.</div>}
      allowedRoles={[ROLES.MANAGER, ROLES.USER]}
    >
      <SiteHeader
        menuName="Danh sách khách hàng"
        menuHref={ROUTES.CUSTOMERS}
        heading={`Customers`}
        showButton={
          <Authorization policyCheck={POLICIES['customer:update'](user as AuthUser)}>
            <Button
              leftIcon={<MdAdd />}
              backgroundColor={bg}
              color={color}
              fontWeight="medium"
              _hover={{ bg: 'gray.700' }}
              _active={{
                bg: 'gray.800',
                transform: 'scale(0.95)',
              }}
              onClick={() => {
                onOpen(CUSTOMER_FORM.ADD);
              }}
            >
              Thêm khách hàng
            </Button>
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
          <Box overflowX="scroll">{customersQuery.isLoading ? spinner : tableCustomer}</Box>
        </Stack>
      </Flex>

      <CustomerFormModal />
      <WarningModal
        onCancel={hideWarningDialog}
        onConfirm={async () => await onConfirmDeleteFood(customerId)}
        visible={warningDialogVisible}
      />
    </Authorization>
  );
};
