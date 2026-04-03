'use client';

import QUERY_KEYS from '@/lib/constants/queryKeys';
import type { SearchParamsQuery } from '@/lib/constants/searchParams';
import { fetchPaginationSourcePages } from '@/server/api/entity/sourcePages/services';
import { useQuery } from '@tanstack/react-query';

export function useSourcePagesPagination<_T>(params: SearchParamsQuery) {
  return useQuery({
    queryKey: [QUERY_KEYS.sourcePages, params],
    queryFn: () => fetchPaginationSourcePages(params),
  });
}
