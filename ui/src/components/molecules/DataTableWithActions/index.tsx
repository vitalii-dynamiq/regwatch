'use client';
import Button from '@/components/atoms/Button';
import Checkbox from '@/components/atoms/Checkbox';
import { AlertDialog } from '@/components/molecules/AlertDialog';
import { DataTable } from '@/components/molecules/DataTable';
import type {
  DataTableWithActionsProps,
  DataTableWithActionsPropsExtended,
  TColumn,
} from '@/components/molecules/DataTableWithActions/types';
import Sheet from '@/components/molecules/Sheet';
import Tooltip from '@/components/molecules/Tooltip';
import { useIsMobile } from '@/hooks/use-mobile';
import SearchParams from '@/lib/constants/searchParams';
import { buildSearchParamsQuery } from '@/lib/helpers/buildSearchParamsQuery';
import { buildUrlQueryParams } from '@/lib/helpers/buildUrlQueryParams';
import { dataFormat } from '@/lib/helpers/dataFormat';
import type { Column, ColumnDef } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown, Eye, Pencil, Trash2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { useMemo } from 'react';

// Helpers and constants extracted for clarity and reuse
const ICON_SIZE = 16;

type ActionElement<TData> = React.ReactElement<{ data?: TData }>;

function isValidElement<TData>(node?: React.ReactNode): node is ActionElement<TData> {
  return !!node && React.isValidElement(node);
}

function getDefaultTitle<TData>(row: TData): string {
  return String((row as Record<string, unknown>)?.title ?? 'Details');
}

function getDefaultDescription<TData>(row: TData): string {
  return String((row as Record<string, unknown>)?.body ?? '');
}

function sortedItems(orderByArray: string[] = []) {
  return orderByArray.reduce<{ [key: string]: 'asc' | 'desc' | undefined }>((acc, item) => {
    const key = item.replace(/^-/, '');
    acc[key] = item.startsWith('-') ? 'desc' : 'asc';
    return acc;
  }, {});
}

function orderByToString(orderBy: Record<string, 'asc' | 'desc' | false | undefined>): string {
  return Object.entries(orderBy)
    .filter(([, value]) => value !== false)
    .map(([key, value]) => `${value === 'desc' ? '-' : ''}${key}`)
    .join(',');
}

// Pure helper to get sort icon by state (no hooks inside non-component functions)
function getSortIconByState(sortState: false | 'asc' | 'desc'): React.ReactNode {
  switch (sortState) {
    case 'asc':
      return <ArrowUp size={ICON_SIZE} />;
    case 'desc':
      return <ArrowDown size={ICON_SIZE} />;
    default:
      return <ArrowUpDown size={ICON_SIZE} />;
  }
}

// Extracted helpers for URL/search params manipulation
function urlParamsToObject(params: URLSearchParams): Record<string, string> {
  const obj: Record<string, string> = {};
  params.forEach((v, k) => {
    obj[k] = v;
  });
  return obj;
}

// Renamed for clarity: these are the action renderers for each row
function renderRowActions<TData>(actions: TColumn['actions'] | undefined, row: TData): React.ReactNode {
  if (!actions || !row) return null;
  const title = getDefaultTitle(row);
  const description = getDefaultDescription(row);
  return (
    <>
      {actions?.custom && isValidElement<TData>(actions.custom) && React.cloneElement(actions.custom, { data: row })}
      {actions.view && (
        <Sheet triggerName={<Eye size={ICON_SIZE} />} variant='ghost' size='sm' title={title} description={description}>
          {isValidElement<TData>(actions.view) && React.cloneElement(actions.view, { data: row })}
        </Sheet>
      )}
      {actions.edit && (
        <Sheet
          triggerName={<Pencil size={ICON_SIZE} />}
          variant='ghost'
          size='sm'
          title={title}
          description={`Edit information about ${title}`}
        >
          {isValidElement<TData>(actions.edit) && React.cloneElement(actions.edit, { data: row })}
        </Sheet>
      )}
      {actions.delete && (
        <AlertDialog
          title='Are you sure you want to delete this item?'
          description='If you delete this entity, you will never be able to get it back again.'
          triggerButton={{
            variant: 'ghost',
            label: <Trash2 size={ICON_SIZE} />,
          }}
          actionButton={{
            asChild: true,
            component: isValidElement<TData>(actions.delete) && React.cloneElement(actions.delete, { data: row }),
          }}
        />
      )}
    </>
  );
}

export function DataTableWithActions<TData>({
  data,
  columns,
  wrapperClassName,
  headerClassName,
  rowClassName,
  cellClassName,
  headCellClassName,
  href,
}: DataTableWithActionsPropsExtended<TData>) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const isMobile = useIsMobile();

  // Introduce explicit types for readability and reuse.
  type SortDirection = 'asc' | 'desc' | false;
  type OrderBy = Record<string, SortDirection | undefined>;

  // Extract: pure helper to toggle sort direction for a column id.
  const toggleSortDirection = React.useCallback((orderBy: OrderBy = {}, columnId: string): OrderBy => {
    const nextToggleSortDirection = makeSortDirection(orderBy, columnId);
    const cleanSortDirection = Object.fromEntries(
      Object.entries(nextToggleSortDirection).filter(([key]) => key !== '')
    ) as Record<string, SortDirection>;
    const keys = Object.keys(cleanSortDirection);
    keys.sort();
    return keys.reduce<OrderBy>((acc, key) => {
      acc[key] = cleanSortDirection[key];
      return acc;
    }, {});
  }, []);

  const makeSortDirection = React.useCallback((orderBy: OrderBy = {}, columnId: string): OrderBy => {
    const current = orderBy[columnId] ?? false;
    if (current === 'asc') {
      return { ...orderBy, [columnId]: 'desc' };
    }
    if (current === 'desc') {
      const { [columnId]: _removed, ...rest } = orderBy;
      return rest;
    }
    // current === false (or not present)
    return { ...orderBy, [columnId]: 'asc' };
  }, []);

  const handleSort = React.useCallback(
    (tableColumn: Column<TData>, currentOrderBy: OrderBy) => {
      const columnId = tableColumn.id;
      const nextOrderBy = toggleSortDirection(currentOrderBy, columnId);

      // Safely convert ReadonlyURLSearchParams to URLSearchParams without casting.
      const paramsObject = urlParamsToObject(new URLSearchParams(searchParams.toString()));
      const searchQueryParams = buildSearchParamsQuery(paramsObject);
      const orderByString = orderByToString(nextOrderBy);

      const url = buildUrlQueryParams(href, { ...searchQueryParams, orderBy: orderByString });
      router.replace(url);
    },
    [router, searchParams, href, toggleSortDirection]
  );

  const buildColumns = React.useCallback(
    (cols: DataTableWithActionsProps<TData>['columns']): ColumnDef<TData>[] => {
      const existingOrderByValue = searchParams.get(SearchParams.orderBy) ?? '';
      const orderByArray = existingOrderByValue.trim().split(',');

      const orderBy = sortedItems(orderByArray);

      return cols.map((col) => ({
        id: col.id,
        accessorKey: col.id,
        header: ({ column: tableColumn }) => {
          if (!col.header.sorting) return col.header.name;

          const sortState = orderBy[tableColumn.id] ?? false;

          return (
            <Button
              variant='ghost'
              size='sm'
              onClick={() => handleSort(tableColumn, orderBy)}
              aria-label={`Sort by ${col.header.name}`}
              aria-sort={sortState === 'asc' ? 'ascending' : sortState === 'desc' ? 'descending' : 'none'}
            >
              {col.header?.name}
              {getSortIconByState(sortState)}
            </Button>
          );
        },
        cell: ({ row }) => {
          if (col.actions) {
            return renderRowActions<TData>(col.actions, row.original);
          }
          const value = row.getValue(col.id);
          switch (col.type) {
            case 'boolean':
              return value ? 'Yes' : 'No';
            case 'datetime':
              return dataFormat(value);
            case 'checkbox':
              return (
                <Checkbox
                  {...{
                    checked: row.getIsSelected(),
                    disabled: !row.getCanSelect(),
                    onChange: row.getToggleSelectedHandler(),
                  }}
                />
              );
            case 'text': {
              const text = String(value ?? '');
              return (
                <p className='truncate max-w-64' title={text}>
                  {text}
                </p>
              );
            }
            case 'tooltip': {
              const text = String(value ?? '');
              return <Tooltip triggerElement={text}>{text}</Tooltip>;
            }
            default:
              return value;
          }
        },
        size: col.size,
      }));
    },
    [handleSort, searchParams]
  );

  const columnDef = useMemo(() => buildColumns(columns), [buildColumns, columns]);

  const pinnedColumns = React.useMemo(() => {
    const pinned = columns.reduce<{ left: string[]; right: string[] }>(
      (acc, column) => {
        if (column.pin === 'left') acc.left.push(column.id as string);
        if (column.pin === 'right') acc.right.push(column.id as string);
        return acc;
      },
      { left: [], right: [] }
    );

    return isMobile ? { left: [], right: [] } : pinned;
  }, [columns, isMobile]);

  return (
    <DataTable
      key={isMobile ? 'mobile' : 'desktop'}
      data={data ?? []}
      columns={columnDef}
      wrapperClassName={wrapperClassName}
      headerClassName={headerClassName}
      rowClassName={rowClassName}
      cellClassName={cellClassName}
      pinnedColumns={pinnedColumns}
      headCellClassName={headCellClassName}
      columnOrder={[]}
    />
  );
}
