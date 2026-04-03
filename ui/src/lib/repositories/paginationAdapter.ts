import type { PaginationResponse } from '@/components/molecules/Pagination/types';

export interface PaginationAdapter<T> {
  items: T[];
  page: number;
  size: number;
  pages: number;
  total: number;
}
export function paginationAdapter<T>(data: unknown): PaginationResponse<T> {
  const { total, size, pages, page, items } = data as PaginationAdapter<T>;
  return {
    items,
    page: Number(page),
    pageSize: Number(size),
    totalPages: Number(pages),
    totalItems: Number(total),
  } as PaginationResponse<T>;
}
