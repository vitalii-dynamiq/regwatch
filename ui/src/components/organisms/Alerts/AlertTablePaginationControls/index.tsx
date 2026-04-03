'use client';

import { TablePaginationControls } from '@/components/molecules/TablePaginationControls';
import { ALERTS_PAGE } from '@/lib/constants/common';
import type { SearchParamsQuery } from '@/lib/constants/searchParams';
import { useAlertsPagination } from '@/server/api/entity/alert/queries';
import type { Alert } from '@/server/api/entity/alert/types';

export function AlertTablePaginationControls({ searchParams }: { searchParams: SearchParamsQuery }) {
  const { data } = useAlertsPagination(searchParams);
  return <TablePaginationControls<Alert> pagination={data} href={ALERTS_PAGE} searchParams={searchParams} />;
}
