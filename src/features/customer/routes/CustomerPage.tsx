import { Box, Flex, Spinner, Stack, Button, useColorModeValue } from '@chakra-ui/react';
import * as React from 'react';
import { MdAdd } from 'react-icons/md';

// import { Table, Td, Th, Tr, SiteHeader, WarningModal } from '@/components';
import { SiteHeader, TableSink, WarningModal } from '@/components';
import { CUSTOMER_FORM, ROUTES } from '@/constants';
import { AuthUser } from '@/features/auth';
import {
  CustomerFormModal,
  mapDataCustomer,
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

  const columns = React.useMemo(
    () => [
      {
        Header: 'Thông tin nhân viên',
        Footer: 'Thông tin nhân viên',
        columns: [
          {
            Header: 'Họ tên',
            accessor: 'fullName',
          },
          {
            Header: 'Email',
            accessor: 'email',
          },
          {
            Header: 'Ngày sinh',
            accessor: 'dateOfBirth',
          },
          {
            Header: 'Giới tính',
            accessor: (originalRow: any) => {
              return originalRow.male ? 'Nam' : 'Nữ';
            },
          },
          {
            Header: 'Số điện thoại',
            accessor: 'phoneNumber',
          },
          {
            Header: 'More',
            accessor: (originalRow: any) => {
              return (
                <CustomerDropdown
                  customer={originalRow}
                  onDelete={() => onDelete(originalRow._id)}
                />
              );
            },
          },
        ],
      },
    ],
    [],
  );

  const rows = React.useMemo(
    () => mapDataCustomer(customersQuery.data?.values.users),
    [customersQuery.data],
  );

  const spinner = (
    <Flex justifyContent="center">
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
    </Flex>
  );

  const tableCustomer = <TableSink columnsTable={columns} rowsTable={rows} isExport />;

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
        message="Điều này sẽ xoá khách hàng hiện tại và bạn không thể khôi phục lại được "
      />
    </Authorization>
  );
};
