import type { SearchParamsQuery } from '@/lib/constants/searchParams';
import { paginationSchema } from '@/lib/zod';
import type z from 'zod';

export type PaginationBaseProps = z.infer<typeof paginationSchema>;

export type PaginationResponse<T> = PaginationBaseProps & {
  items: T[];
};

export type PaginationProps<T> = {
  href: string;
  className?: string;
  pagination?: PaginationResponse<T>;
  searchParams: SearchParamsQuery;
};
