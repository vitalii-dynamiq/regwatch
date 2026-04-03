import { SourcesFilter } from '@/components/organisms/Sources/SourceFilter';
import { SourcesTable } from '@/components/organisms/Sources/SourceTable';
import { SourceTablePaginationControls } from '@/components/organisms/Sources/SourceTablePaginationControls';
import QUERY_KEYS from '@/lib/constants/queryKeys';
import SearchParams, { type SearchParamsQuery } from '@/lib/constants/searchParams';
import { resolveNormalizedSearchParams } from '@/lib/helpers/resolveNormalizedSearchParams';
import { createHydration } from '@/rest/create-hydration';
import { fetchPaginationSources } from '@/server/api/entity/source/services';
import { fetchSourceAssets } from '@/server/api/entity/sourceAssets/services';
import { HydrationBoundary } from '@tanstack/react-query';

export default async function SourcesPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParamsQuery> | undefined;
}) {
  const normalizedParams = await resolveNormalizedSearchParams(searchParams, {
    [SearchParams.orderBy]: 'name',
  });

  const [sourcesHydration, assetsHydration] = await Promise.all([
    createHydration([QUERY_KEYS.sources, normalizedParams], () => fetchPaginationSources(normalizedParams)),
    createHydration([QUERY_KEYS.sourceAssets], () => fetchSourceAssets()),
  ]);

  const { dehydratedState: sourcesDehydratedState } = sourcesHydration;
  const { dehydratedState: assetsDehydratedState } = assetsHydration;

  return (
    <HydrationBoundary state={sourcesDehydratedState}>
      <HydrationBoundary state={assetsDehydratedState}>
        <SourcesFilter />
        <SourcesTable searchParams={normalizedParams} />
        <SourceTablePaginationControls searchParams={normalizedParams} />
      </HydrationBoundary>
    </HydrationBoundary>
  );
}
