import type { SourcePageAlertsRouteParams } from '@/app/(private)/sources/[sourceId]/[pageId]/types';
import SourcePageDetails from '@/components/organisms/SourcePages/SourcePageDetails';
import QUERY_KEYS from '@/lib/constants/queryKeys';
import { resolveNormalizedParams } from '@/lib/helpers/resolveNormalizedParams';
import { createHydration } from '@/rest/create-hydration';
import { fetchSourceById } from '@/server/api/entity/source/services';
import { fetchSourceAssets } from '@/server/api/entity/sourceAssets/services';
import { HydrationBoundary } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Alerts detected',
  description: '',
};

export default async function SourcePageAlertsPage({
  params,
}: {
  params?: Promise<SourcePageAlertsRouteParams> | undefined;
}) {
  const { sourceId, pageId } = await resolveNormalizedParams<SourcePageAlertsRouteParams>(params);

  if (!sourceId || !pageId) notFound();

  const [sourceHydration, assetsHydration] = await Promise.all([
    createHydration([QUERY_KEYS.source, sourceId], () => fetchSourceById(sourceId)),
    createHydration([QUERY_KEYS.sourceAssets], () => fetchSourceAssets()),
  ]);

  const { dehydratedState: sourceDehydratedState } = sourceHydration;
  const { dehydratedState: assetsDehydratedState } = assetsHydration;

  return (
    <HydrationBoundary state={sourceDehydratedState}>
      <HydrationBoundary state={assetsDehydratedState}>
        <SourcePageDetails />
      </HydrationBoundary>
    </HydrationBoundary>
  );
}
