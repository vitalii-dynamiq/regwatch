'use client';

import QUERY_KEYS from '@/lib/constants/queryKeys';
import { fetchDashboardWidgets } from '@/server/api/entity/dashboard/services';
import { useQuery } from '@tanstack/react-query';

export function useDashboardWidgets() {
  return useQuery({
    queryKey: [QUERY_KEYS.dashboardWidgets],
    queryFn: () => fetchDashboardWidgets(),
  });
}
