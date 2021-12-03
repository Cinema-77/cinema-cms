import {
  Thead,
  Tbody,
  chakra,
  Table,
  Tr,
  Th,
  Td,
  Icon,
  Input,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  Stack,
  Select,
} from '@chakra-ui/react';
import * as React from 'react';
import { FiArrowRight, FiArrowDown } from 'react-icons/fi';
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';
import {
  useTable,
  usePagination,
  useGroupBy,
  useExpanded,
  useSortBy,
  useAsyncDebounce,
  useGlobalFilter,
} from 'react-table';
// import matchSorter from 'match-sorter';

import { mapDataRevenue } from '@/features/revenue';
import { formatNumber } from '@/utils/format';

const MenuFilter = ({ headerGroups }: any) => {
  return (
    <Menu closeOnSelect={false}>
      <MenuButton as={Button} colorScheme="blue">
        Nhóm theo
      </MenuButton>
      <MenuList minWidth="240px">
        <MenuOptionGroup title="Nhóm" type="checkbox">
          {headerGroups[1].headers
            .filter((column: any) => column.canGroupBy)
            .map((column: any, index: number) => (
              <MenuItemOption
                value={column.render('Header')}
                {...column.getGroupByToggleProps()}
                key={index}
              >
                {column.render('Header')}
              </MenuItemOption>
            ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};
const GlobalFilter = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter }: any) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <chakra.span display="flex" alignItems="center">
      <Input
        variant="outline"
        placeholder={`Search: ${count} records...`}
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </chakra.span>
  );
};
interface TableRevenueProps {
  rowsTable: any;
}

export const TableRevenue: React.FC<TableRevenueProps> = ({ rowsTable }) => {
  const data = React.useMemo(() => mapDataRevenue(rowsTable), [rowsTable]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Thông tin',
        Footer: 'Thông tin',
        columns: [
          {
            Header: 'Mã HD',
            accessor: 'billId',
            aggregate: 'count',
            Aggregated: ({ value }: any) => `${value} hđ`,
          },
          {
            Header: 'Tên phim',
            accessor: 'movieName',
            aggregate: 'count',
            Aggregated: ({ value }: any) => `${value} phim`,
          },
          {
            Header: 'Phòng',
            accessor: 'roomName',
            aggregate: 'uniqueCount',
            Aggregated: ({ value }) => `${value} phòng`,
          },
          {
            Header: 'Màn hình',
            accessor: 'screenName',
          },
        ],
      },
      {
        Header: 'Doanh thu bán hàng',
        Footer: 'Doanh thu bán hàng',

        columns: [
          {
            Header: 'Số lượng',
            accessor: 'quantity',
            canGroupBy: false,
          },
          {
            Header: 'Đơn giá',
            accessor: 'price',
            canGroupBy: false,
          },
          {
            Header: 'Loại',
            accessor: 'type',
          },
          {
            Header: 'Tổng',
            accessor: 'totalString',
            canGroupBy: false,
            Footer: (info: any) => {
              // Only calculate total visits if rows change

              const total = React.useMemo(
                () =>
                  info.rows.reduce((sum: any, row: any) => parseInt(row.original.total) + sum, 0),
                // eslint-disable-next-line
                [],
              );

              return <>Tổng: {formatNumber(total)}</>;
            },
          },
        ],
      },
    ],
    [],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    { columns, data },
    useGroupBy,
    useGlobalFilter,
    useSortBy,
    useExpanded,
    usePagination,
  ) as any;

  return (
    <>
      <Stack spacing={2} direction="row" justifyContent="flex-end">
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        <MenuFilter headerGroups={headerGroups} />
      </Stack>

      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup: any) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column: any) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  isNumeric={column.isNumeric}
                  key={column.id}
                >
                  {column.render('Header')}
                  <chakra.span pl="4">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <Icon as={GoTriangleDown} aria-label="sorted descending" />
                      ) : (
                        <Icon as={GoTriangleUp} aria-label="sorted ascending" />
                      )
                    ) : null}
                  </chakra.span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row: any) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell: any, index: number) => (
                  <Td key={index} {...cell.getCellProps()}>
                    {cell.isGrouped ? (
                      // If it's a grouped cell, add an expander and row count
                      <>
                        <chakra.span {...row.getToggleRowExpandedProps()}>
                          {row.isExpanded ? (
                            <Icon as={FiArrowDown} aria-label="expanded" />
                          ) : (
                            <Icon as={FiArrowRight} aria-label="unexpanded" />
                          )}
                        </chakra.span>
                        {cell.render('Cell')} ({row.subRows.length})
                      </>
                    ) : cell.isAggregated ? (
                      // If the cell is aggregated, use the Aggregated
                      // renderer for cell
                      cell.render('Aggregated')
                    ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                      // Otherwise, just render the regular cell
                      cell.render('Cell')
                    )}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
        <tfoot>
          {footerGroups.map((group: any) => (
            <tr {...group.getFooterGroupProps()} key={group.id}>
              {group.headers.map((column: any) => (
                <td {...column.getFooterProps()} key={column.id}>
                  {column.render('Footer')}
                </td>
              ))}
            </tr>
          ))}
        </tfoot>
      </Table>

      <Stack spacing={3} direction="row">
        <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </Button>
        <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </Button>
        <Button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </Button>
        <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </Button>
        <chakra.span display="flex" alignItems="center">
          Page
          <strong style={{ marginLeft: '4px' }}>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </chakra.span>
        <chakra.span>
          | Go to page:{' '}
          <Input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            width="100px"
          />
        </chakra.span>{' '}
        <Select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
          maxWidth="240px"
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Xem {pageSize}
            </option>
          ))}
        </Select>
      </Stack>
    </>
  );
};
