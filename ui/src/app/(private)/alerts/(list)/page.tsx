import { AlertFilter } from '@/components/organisms/Alerts/AlertFilter';
import { AlertTable } from '@/components/organisms/Alerts/AlertTable';
import { AlertTablePaginationControls } from '@/components/organisms/Alerts/AlertTablePaginationControls';
import QUERY_KEYS from '@/lib/constants/queryKeys';
import SearchParams, { type SearchParamsQuery } from '@/lib/constants/searchParams';
import { resolveNormalizedSearchParams } from '@/lib/helpers/resolveNormalizedSearchParams';
import { createHydration } from '@/rest/create-hydration';
import { fetchPaginationAlerts } from '@/server/api/entity/alert/services';
import { fetchAlertAssets } from '@/server/api/entity/alertAssets/services';
import { HydrationBoundary } from '@tanstack/react-query';
import * as React from 'react';

export default async function AlertsPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParamsQuery> | undefined;
}) {
  const normalizedParams = await resolveNormalizedSearchParams(searchParams, {
    [SearchParams.orderBy]: 'title',
  });

  const [alertsHydration, alertAssetsHydration] = await Promise.all([
    createHydration([QUERY_KEYS.alerts, normalizedParams], () => fetchPaginationAlerts(normalizedParams)),
    createHydration([QUERY_KEYS.alertAssets], () => fetchAlertAssets()),
  ]);

  const { dehydratedState: alertsDehydratedState } = alertsHydration;
  const { dehydratedState: assetsDehydratedState } = alertAssetsHydration;

  return (
    <HydrationBoundary state={alertsDehydratedState}>
      <HydrationBoundary state={assetsDehydratedState}>
        <AlertFilter />
        <AlertTable searchParams={normalizedParams} />
        <AlertTablePaginationControls searchParams={normalizedParams} />
      </HydrationBoundary>
    </HydrationBoundary>
  );
}
