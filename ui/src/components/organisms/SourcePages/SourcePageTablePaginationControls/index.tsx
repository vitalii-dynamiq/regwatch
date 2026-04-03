'use client';

import { TablePaginationControls } from '@/components/molecules/TablePaginationControls';
import type { SearchParamsQuery } from '@/lib/constants/searchParams';
import { useSourcePagesPagination } from '@/server/api/entity/sourcePages/queries';
import type { SourcePage } from '@/server/api/entity/sourcePages/types';
import { usePathname } from 'next/navigation';

export function SourcePageTablePaginationControls({ searchParams }: { searchParams: SearchParamsQuery }) {
  const pathname = usePathname();
  const { sourceId, ...restSearchParams } = searchParams;
  const { data } = useSourcePagesPagination(searchParams);

  if (!data) return null;
  return <TablePaginationControls<SourcePage> pagination={data} href={pathname} searchParams={restSearchParams} />;
}
