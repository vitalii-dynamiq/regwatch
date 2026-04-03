import type { Obligation } from '@/server/api/entity/obligation/types';

export default function ObligationTableCellUpdatedBy({
  data,
  userMap,
}: {
  data?: Obligation;
  userMap: Record<string, string>;
}) {
  if (!data?.last_updated_by) return null;
  return <span>{userMap[data.last_updated_by] ?? data.last_updated_by}</span>;
}
