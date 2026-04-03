import type { SourcePageAlertRouteParams } from '@/app/(private)/sources/[sourceId]/[pageId]/[alertId]/types';
import Title from '@/components/atoms/Title';
import CompareChangesViewer from '@/components/molecules/CompareChangesViewer';
import { resolveNormalizedParams } from '@/lib/helpers/resolveNormalizedParams';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Compare changes',
  description: '',
};
export default async function SourcePageAlertPage({
  params,
}: {
  params?: Promise<SourcePageAlertRouteParams> | undefined;
}) {
  const { sourceId, alertId, pageId } = await resolveNormalizedParams<SourcePageAlertRouteParams>(params);

  if (!sourceId || !pageId || !alertId) notFound();
  return (
    <>
      <Title level={3}>Market Risk Obligation Update</Title>
      <CompareChangesViewer />
    </>
  );
}
