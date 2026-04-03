import type { Alert } from '@/server/api/entity/alert/types';

export default function AlertTableCellAssignedTo({
  data,
  userMap,
}: {
  data?: Alert;
  userMap: Record<string, string>;
}) {
  if (!data?.assigned_to) return null;
  return <span>{userMap[data.assigned_to] ?? data.assigned_to}</span>;
}
