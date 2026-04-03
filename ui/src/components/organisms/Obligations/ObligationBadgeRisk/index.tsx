import { BadgeRisk } from '@/components/molecules/BadgeRisk';
import type { Obligation } from '@/server/api/entity/obligation/types';

export function ObligationBadgeRisk({ data }: { data?: Obligation }) {
  return <BadgeRisk risk={data?.risk_level?.id} />;
}
