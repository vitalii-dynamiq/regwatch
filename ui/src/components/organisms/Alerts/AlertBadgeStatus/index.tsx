import type { Alert } from '@/server/api/entity/alert/types';
import { Badge } from '@/ui/badge';

export function AlertBadgeStatus({ data }: { data?: Alert | null }) {
  if (!data) return null;
  return <Badge variant={'outline'}>{data?.status.name}</Badge>;
}
