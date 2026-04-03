'use client';

import QUERY_KEYS from '@/lib/constants/queryKeys';
import { fetchAlertAssets } from '@/server/api/entity/alertAssets/services';
import { useQuery } from '@tanstack/react-query';

export function useAlertAssets() {
  return useQuery({
    queryKey: [QUERY_KEYS.alertAssets],
    queryFn: () => fetchAlertAssets(),
  });
}
