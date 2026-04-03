import { HydrationBoundary } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import Title from '@/components/atoms/Title';
import { SourcePagesTable } from '@/components/organisms/SourcePages/SourcePageTable';
import { SourcePageTablePaginationControls } from '@/components/organisms/SourcePages/SourcePageTablePaginationControls';
import QUERY_KEYS from '@/lib/constants/queryKeys';
import SearchParams, { type SearchParamsQuery } from '@/lib/constants/searchParams';
import { normalizeSearchParams } from '@/lib/helpers/normalizeSearchParams';
import { createHydration } from '@/rest/create-hydration';
import { fetchSourceById } from '@/server/api/entity/source/services';
import { fetchPaginationSourcePages } from '@/server/api/entity/sourcePages/services';
import type { Metadata } from 'next';

// Types
type SourceRouteParams = { sourceId: string };

function requireSourceId(params: SourceRouteParams): string {
  const id = params?.sourceId?.trim();
  if (!id) notFound();
  return id;
}

export async function generateMetadata({ params }: { params: Promise<SourceRouteParams> }): Promise<Metadata> {
  const sourceId = requireSourceId(await params);
  const obligationMeta = await fetchSourceById(sourceId);
  return {
    title: obligationMeta.name,
    description: obligationMeta.description,
  };
}

export default async function SourcePages({
  params,
  searchParams,
}: { params: Promise<SourceRouteParams>; searchParams?: Promise<SearchParamsQuery> | undefined }) {
  const sourceId = await requireSourceId(await params);

  if (!sourceId) notFound();

  const resolvedSearchParams = searchParams ? await searchParams : undefined;

  const normalizedParams = normalizeSearchParams({
    [SearchParams.orderBy]: 'created_at',
    [SearchParams.isRegulatory]: 1,
    [SearchParams.pageSize]: 50,
    ...(resolvedSearchParams ?? {}),
  });

  const sourcePagesParams = { sourceId, ...normalizedParams };

  const [sourceHydration, sourcePagesHydration] = await Promise.all([
    createHydration([QUERY_KEYS.source, sourceId], () => fetchSourceById(sourceId)),
    createHydration([QUERY_KEYS.sourcePages, sourcePagesParams], () => fetchPaginationSourcePages(sourcePagesParams)),
  ]);

  const { data: source, dehydratedState: sourceDehydratedState } = sourceHydration;
  const { dehydratedState: sourcePagesDehydratedState } = sourcePagesHydration;

  if (!source) notFound();

  return (
    <HydrationBoundary state={sourceDehydratedState}>
      <HydrationBoundary state={sourcePagesDehydratedState}>
        <Title level={4} className='font-semibold'>
          Pages monitored
        </Title>
        <SourcePagesTable searchParams={sourcePagesParams} />
        <SourcePageTablePaginationControls searchParams={sourcePagesParams} />
      </HydrationBoundary>
    </HydrationBoundary>
  );
}
