import type { PaginationProps } from '@/components/molecules/Pagination/types';

export interface PageSizeSelectProps<T> extends Pick<PaginationProps<T>, 'href' | 'searchParams'> {}
