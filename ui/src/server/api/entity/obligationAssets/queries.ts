'use client';

import QUERY_KEYS from '@/lib/constants/queryKeys';
import { fetchObligationAssets } from '@/server/api/entity/obligationAssets/services';
import { useQuery } from '@tanstack/react-query';

export function useObligationAssets() {
  return useQuery({
    queryKey: [QUERY_KEYS.obligationAssets],
    queryFn: () => fetchObligationAssets(),
  });
}
