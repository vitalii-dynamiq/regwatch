import type { PaginationProps } from '@/components/molecules/Pagination/types';

export interface TablePaginationControlsProps<T>
  extends Pick<PaginationProps<T>, 'pagination' | 'href' | 'searchParams'> {}
