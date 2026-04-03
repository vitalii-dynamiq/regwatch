'use client';

import { TablePaginationControls } from '@/components/molecules/TablePaginationControls';
import { OBLIGATIONS_PAGE } from '@/lib/constants/common';
import type { SearchParamsQuery } from '@/lib/constants/searchParams';
import { useObligationsPagination } from '@/server/api/entity/obligation/queries';
import type { Obligation } from '@/server/api/entity/obligation/types';

export function ObligationTablePaginationControls({ searchParams }: { searchParams: SearchParamsQuery }) {
  const { data } = useObligationsPagination(searchParams);
  return <TablePaginationControls<Obligation> pagination={data} href={OBLIGATIONS_PAGE} searchParams={searchParams} />;
}
