import type { SourcePagesRouteParams } from '@/app/(private)/sources/[sourceId]/(page)/types';

export type SourcePageAlertsRouteParams = SourcePagesRouteParams & {
  pageId: string;
};
