import type { Obligation } from '@/server/api/entity/obligation/types';
import { Badge } from '@/ui/badge';

export function ObligationTableCellStatusBadge({ data }: { data?: Obligation | null }) {
  if (!data) return null;
  return <Badge variant={'outline'}>{data?.status.name}</Badge>;
}
