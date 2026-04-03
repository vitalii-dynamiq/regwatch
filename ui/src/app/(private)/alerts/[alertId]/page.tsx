import type { AlertId, AlertPage, AlertPageProps } from '@/app/(private)/alerts/[alertId]/types';
import AlertDetails from '@/components/organisms/Alerts/AlertDetails';
import QUERY_KEYS from '@/lib/constants/queryKeys';
import { createQueryClient } from '@/rest/query-client';
import { fetchAlertById } from '@/server/api/entity/alert/services';
import { fetchAlertAssets } from '@/server/api/entity/alertAssets/services';
import { fetchPaginationUsers } from '@/server/api/entity/user/services';
import { HydrationBoundary, type QueryFunction, dehydrate } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Extract: central param parsing
function parseAlertIdSync(params: AlertPage): AlertId {
  const alertId = params?.alertId?.trim();
  if (!alertId) notFound();
  return alertId;
}

// Introduce constants: reused pagination params
const USERS_PARAMS = { pageSize: 1000, orderBy: 'created_at' as const };

// Extract: build hydration configs
function buildHydrationConfigs(alertId: AlertId) {
  return [
    { key: [QUERY_KEYS.alert, alertId] as const, fn: () => fetchAlertById(alertId) },
    { key: [QUERY_KEYS.alertAssets] as const, fn: () => fetchAlertAssets() },
    { key: [QUERY_KEYS.users, USERS_PARAMS] as const, fn: () => fetchPaginationUsers(USERS_PARAMS) },
  ];
}

export async function generateMetadata({ params }: AlertPageProps): Promise<Metadata> {
  const alertId = parseAlertIdSync(await params);
  const alertMeta = await fetchAlertById(alertId);
  return {
    title: alertMeta.title,
    description: alertMeta.description,
  };
}

export default async function AlertPage({ params }: AlertPageProps) {
  const alertId = parseAlertIdSync(await params);

  // Single QueryClient per request
  const queryClient = createQueryClient();

  // Prefetch all queries on the same client
  const hydrationConfigs = buildHydrationConfigs(alertId);
  await Promise.all(
    hydrationConfigs.map(({ key, fn }) =>
      queryClient.prefetchQuery({
        queryKey: key,
        queryFn: fn as QueryFunction,
      })
    )
  );

  // Obtain alert from cache to validate presence
  const alert = queryClient.getQueryData<Awaited<ReturnType<typeof fetchAlertById>>>([QUERY_KEYS.alert, alertId]);

  if (!alert) notFound();

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <AlertDetails alert={alert} />
    </HydrationBoundary>
  );
}
