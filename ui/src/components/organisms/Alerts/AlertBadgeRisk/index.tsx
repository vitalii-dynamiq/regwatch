import { BadgeRisk } from '@/components/molecules/BadgeRisk';
import type { Alert } from '@/server/api/entity/alert/types';

export function AlertBadgeRisk({ data }: { data?: Alert | null }) {
  if (!data) return null;
  return <BadgeRisk risk={data?.risk_level?.id} />;
}
