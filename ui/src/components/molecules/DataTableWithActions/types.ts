import type { SortDirection } from '@tanstack/react-table';

export type TColumn = {
  id: string;
  header: {
    name: string | React.ReactNode;
    sorting?: boolean;
  };
  actions?: {
    custom?: React.ReactNode;
    view?: React.ReactNode;
    edit?: React.ReactNode;
    delete?: React.ReactNode;
  };
  type?:
    | 'text'
    | 'number'
    | 'boolean'
    | 'date'
    | 'datetime'
    | 'time'
    | 'currency'
    | 'percent'
    | 'image'
    | 'file'
    | 'link'
    | 'tooltip'
    | 'checkbox';
  pin?: 'left' | 'right';
  size?: number;
};

export interface DataTableWithActionsProps<TData> {
  columns: TColumn[];
  data: TData[] | null;
}

export interface DataTableWithActionsPropsExtended<TData> extends DataTableWithActionsProps<TData> {
  wrapperClassName?: string;
  headerClassName?: string;
  rowClassName?: string;
  cellClassName?: string;
  headCellClassName?: string;
  href: string;
}

export interface SortableColumn {
  id: string | undefined;
  getIsSorted?: () => 'none' | SortDirection;
  toggleSorting(b: boolean): void;
}
