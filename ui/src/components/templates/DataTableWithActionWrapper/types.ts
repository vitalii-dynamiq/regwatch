import type { TColumn } from '@/components/molecules/DataTableWithActions/types';

export type DataTableWithActionWrapperProps<T> = {
  columns: TColumn[];
  data: T[] | null;
  href?: string;
  className?: string;
};
