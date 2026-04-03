import { ObligationFilter } from '@/components/organisms/Obligations/ObligationFilter';
import { ObligationsTable } from '@/components/organisms/Obligations/ObligationTable';
import { ObligationTablePaginationControls } from '@/components/organisms/Obligations/ObligationTablePaginationControls';
import QUERY_KEYS from '@/lib/constants/queryKeys';
import SearchParams, { type SearchParamsQuery } from '@/lib/constants/searchParams';
import { normalizeSearchParams } from '@/lib/helpers/normalizeSearchParams';
import { createHydration } from '@/rest/create-hydration';
import { fetchPaginationObligations } from '@/server/api/entity/obligation/services';
import { fetchObligationAssets } from '@/server/api/entity/obligationAssets/services';
import { HydrationBoundary } from '@tanstack/react-query';
import * as React from 'react';

export default async function ObligationsPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParamsQuery> | undefined;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;

  const normalizedParams = normalizeSearchParams({
    [SearchParams.orderBy]: 'title',
    ...(resolvedSearchParams ?? {}),
  });

  const [obligationsHydration, obligationAssetsHydration] = await Promise.all([
    createHydration([QUERY_KEYS.obligations, normalizedParams], () => fetchPaginationObligations(normalizedParams)),
    createHydration([QUERY_KEYS.obligationAssets], () => fetchObligationAssets()),
  ]);

  const { dehydratedState: obligationsDehydratedState } = obligationsHydration;
  const { dehydratedState: assetsDehydratedState } = obligationAssetsHydration;

  return (
    <HydrationBoundary state={obligationsDehydratedState}>
      <HydrationBoundary state={assetsDehydratedState}>
        <ObligationFilter />
        <ObligationsTable searchParams={normalizedParams} />
        <ObligationTablePaginationControls searchParams={normalizedParams} />
      </HydrationBoundary>
    </HydrationBoundary>
  );
}
