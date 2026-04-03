'use client';

import {
  type Column,
  type ColumnDef,
  type ColumnPinningState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { cn } from '@/lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/ui/table';
import type { CSSProperties } from 'react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  wrapperClassName?: string;
  headerClassName?: string;
  headCellClassName?: string;
  rowClassName?: string;
  cellClassName?: string;
  pinnedColumns?: ColumnPinningState;
  columnOrder?: string[];
}

function getCommonPinningStyles<TData>(column: Column<TData>): CSSProperties {
  const pinned = column.getIsPinned();
  const isLeft = pinned === 'left';
  const isRight = pinned === 'right';
  const isSticky = isLeft || isRight;

  return {
    boxShadow:
      isLeft && column.getIsLastColumn('left')
        ? '-4px 0 4px -4px rgba(0,0,0,0.25) inset'
        : isRight && column.getIsFirstColumn('right')
          ? '4px 0 4px -4px rgba(0,0,0,0.25) inset'
          : undefined,
    left: isLeft ? column.getStart('left') : undefined,
    right: isRight ? column.getAfter('right') : undefined,
    // Avoid opacity to prevent blurry text on pinned columns
    position: isSticky ? 'sticky' : undefined,
    zIndex: isSticky ? 2 : undefined,
    width: column.getSize(), // number => px
  };
}

export function DataTable<TData, TValue>({
  columns,
  data,
  wrapperClassName,
  headerClassName,
  headCellClassName,
  rowClassName,
  cellClassName,
  pinnedColumns = { left: [], right: [] },
  columnOrder = [],
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableColumnPinning: true,
    initialState: {
      columnPinning: pinnedColumns,
      columnOrder,
    },
  });

  return (
    <div className={cn('rounded-md border max-w-full overflow-x-auto', wrapperClassName)}>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className={headerClassName}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  colSpan={header.colSpan}
                  className={headCellClassName}
                  style={{ ...getCommonPinningStyles(header.column), width: header.getSize() }}
                >
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'} className={rowClassName}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className={cellClassName} style={{ ...getCommonPinningStyles(cell.column) }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
