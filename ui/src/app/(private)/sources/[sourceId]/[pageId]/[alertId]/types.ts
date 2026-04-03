import type { SourcePageAlertsRouteParams } from '@/app/(private)/sources/[sourceId]/[pageId]/types';

export type SourcePageAlertRouteParams = SourcePageAlertsRouteParams & {
  alertId: string;
};
