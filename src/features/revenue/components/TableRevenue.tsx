import { Thead, Tbody, chakra, Table, Tr, Th, Td, Icon } from '@chakra-ui/react';
import * as React from 'react';
// import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';
import { FiArrowRight, FiArrowDown, FiXCircle, FiBox } from 'react-icons/fi';
import { useTable, useGroupBy, useExpanded } from 'react-table';

import { mapDataRevenue } from '@/features/revenue';
import { formatNumber } from '@/utils/format';

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
            Header: 'Tên phim',
            accessor: 'movieName',
            aggregate: 'count',
            Aggregated: ({ value }: any) => `${value} Names`,
          },
          {
            Header: 'Phòng',
            accessor: 'roomName',
            aggregate: 'uniqueCount',
            Aggregated: ({ value }) => `${value} Unique Room`,
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
          },
          {
            Header: 'Đơn giá',
            accessor: 'price',
          },
          {
            Header: 'Loại',
            accessor: 'type',
          },
          {
            Header: 'Tổng',
            accessor: 'totalString',
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

  const { getTableProps, getTableBodyProps, headerGroups, footerGroups, rows, prepareRow } =
    useTable({ columns, data }, useGroupBy, useExpanded);

  return (
    <Table {...getTableProps()}>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
            {headerGroup.headers.map((column: any) => (
              <Th {...column.getHeaderProps()} isNumeric={column.isNumeric} key={column.id}>
                {column.canGroupBy ? (
                  // If the column can be grouped, let's add a toggle
                  <chakra.span {...column.getGroupByToggleProps()} mr={2}>
                    {column.isGrouped ? (
                      <Icon as={FiXCircle} aria-label="Close group" />
                    ) : (
                      <Icon as={FiBox} aria-label=" group" />
                    )}
                  </chakra.span>
                ) : null}
                {column.render('Header')}
                {/* <chakra.span pl="4">
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <Icon as={GoTriangleDown} aria-label="sorted descending" />
                    ) : (
                      <Icon as={GoTriangleUp} aria-label="sorted ascending" />
                    )
                  ) : null}
                </chakra.span> */}
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row: any) => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()} key={row.id}>
              {row.cells.map((cell: any, index: number) => (
                <Td
                  // For educational purposes, let's color the
                  // cell depending on what type it is given
                  // from the useGroupBy hook
                  key={index}
                  {...cell.getCellProps()}
                  //   style={{
                  //     background: cell.isGrouped
                  //       ? '#0aff0082'
                  //       : cell.isAggregated
                  //       ? '#ffa50078'
                  //       : cell.isPlaceholder
                  //       ? '#ff000042'
                  //       : 'white',
                  //   }}
                >
                  {cell.isGrouped ? (
                    // If it's a grouped cell, add an expander and row count
                    <>
                      <chakra.span {...row.getToggleRowExpandedProps()}>
                        {row.isExpanded ? (
                          <Icon as={FiArrowDown} aria-label="expanded" />
                        ) : (
                          <Icon as={FiArrowRight} aria-label="unexpanded" />
                        )}
                      </chakra.span>{' '}
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
                // <Td key={index} {...cell.getCellProps()} isNumeric={cell.column.isNumeric}>
                //   {cell.render('Cell')}
                // </Td>
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
  );
};
