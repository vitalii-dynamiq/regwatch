'use client';

import { TablePaginationControls } from '@/components/molecules/TablePaginationControls';
import { SOURCES_PAGE } from '@/lib/constants/common';
import type { SearchParamsQuery } from '@/lib/constants/searchParams';
import { useSourcesPagination } from '@/server/api/entity/source/queries';
import type { SourceListItem } from '@/server/api/entity/source/types';

export function SourceTablePaginationControls({ searchParams }: { searchParams: SearchParamsQuery }) {
  const { data } = useSourcesPagination(searchParams);
  return <TablePaginationControls<SourceListItem> pagination={data} href={SOURCES_PAGE} searchParams={searchParams} />;
}
