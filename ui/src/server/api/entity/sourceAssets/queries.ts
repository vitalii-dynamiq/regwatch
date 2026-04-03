'use client';

import QUERY_KEYS from '@/lib/constants/queryKeys';
import { fetchSourceAssets } from '@/server/api/entity/sourceAssets/services';
import { useQuery } from '@tanstack/react-query';

export function useSourceAssets() {
  return useQuery({
    queryKey: [QUERY_KEYS.sourceAssets],
    queryFn: () => fetchSourceAssets(),
  });
}
