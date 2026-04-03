import { PageSizeSelect } from '@/components/molecules/PageSizeSelect';
import { Pagination } from '@/components/molecules/Pagination';
import type { TablePaginationControlsProps } from '@/components/molecules/TablePaginationControls/types';

export function TablePaginationControls<T>({ pagination, href, searchParams }: TablePaginationControlsProps<T>) {
  if (!pagination) return null;
  const { totalPages } = pagination;

  if (totalPages === null || totalPages === undefined || isNaN(totalPages) || 1 >= totalPages) return null;

  if (!href) return null;
  return (
    <div className='flex md:items-center md:justify-between py-4 flex-col md:flex-row gap-4'>
      <PageSizeSelect<T> href={href} searchParams={searchParams} />
      <Pagination<T> pagination={pagination} href={href} searchParams={searchParams} className='w-fit block mx-0' />
    </div>
  );
}
