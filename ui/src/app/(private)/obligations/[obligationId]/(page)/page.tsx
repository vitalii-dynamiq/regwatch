import type {
  ObligationId,
  ObligationPage,
  ObligationPageProps,
} from '@/app/(private)/obligations/[obligationId]/(page)/types';
import ObligationDetails from '@/components/organisms/Obligations/ObligationDetails';
import QUERY_KEYS from '@/lib/constants/queryKeys';
import { createQueryClient } from '@/rest/query-client'; // import the factory that creates a QueryClient
import { fetchObligationById } from '@/server/api/entity/obligation/services';
import { fetchObligationAssets } from '@/server/api/entity/obligationAssets/services';
import { fetchPaginationSources } from '@/server/api/entity/source/services';
import { fetchPaginationUsers } from '@/server/api/entity/user/services';
import { HydrationBoundary, type QueryFunction, dehydrate } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Extract: central param parsing
function parseObligationIdSync(params: ObligationPage): ObligationId {
  const obligationId = params?.obligationId?.trim();
  if (!obligationId) notFound();
  return obligationId;
}

// Introduce constants: reused pagination params
const USERS_PARAMS = { pageSize: 1000, orderBy: 'created_at' as const };
const SOURCES_PARAMS = { pageSize: 1000, orderBy: 'name' as const };

// Extract: build hydration configs
function buildHydrationConfigs(obligationId: ObligationId) {
  return [
    { key: [QUERY_KEYS.obligation, obligationId] as const, fn: () => fetchObligationById(obligationId) },
    { key: [QUERY_KEYS.obligationAssets] as const, fn: () => fetchObligationAssets() },
    { key: [QUERY_KEYS.users, USERS_PARAMS] as const, fn: () => fetchPaginationUsers(USERS_PARAMS) },
    { key: [QUERY_KEYS.sources, SOURCES_PARAMS] as const, fn: () => fetchPaginationSources(SOURCES_PARAMS) },
  ];
}

export async function generateMetadata({ params }: ObligationPageProps): Promise<Metadata> {
  const obligationId = parseObligationIdSync(await params);
  const obligationMeta = await fetchObligationById(obligationId);
  return {
    title: obligationMeta.title,
    description: obligationMeta.description,
  };
}

export default async function ObligationPage({ params }: ObligationPageProps) {
  const obligationId = parseObligationIdSync(await params);

  // Single QueryClient per request
  const queryClient = createQueryClient();

  // Prefetch all queries on the same client
  const hydrationConfigs = buildHydrationConfigs(obligationId);
  await Promise.all(
    hydrationConfigs.map(({ key, fn }) =>
      queryClient.prefetchQuery({
        queryKey: key,
        queryFn: fn as QueryFunction,
      })
    )
  );

  // Obtain obligation from cache to validate presence
  const obligation = queryClient.getQueryData<Awaited<ReturnType<typeof fetchObligationById>>>([
    QUERY_KEYS.obligation,
    obligationId,
  ]);

  if (!obligation) notFound();

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ObligationDetails obligation={obligation} />
    </HydrationBoundary>
  );
}
