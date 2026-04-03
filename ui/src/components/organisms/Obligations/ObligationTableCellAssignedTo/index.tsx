import type { Obligation } from '@/server/api/entity/obligation/types';

export default function ObligationTableCellAssignedTo({
  data,
  userMap,
}: {
  data?: Obligation;
  userMap: Record<string, string>;
}) {
  if (!data?.assigned_to) return null;
  return <span>{userMap[data.assigned_to] ?? data.assigned_to}</span>;
}
