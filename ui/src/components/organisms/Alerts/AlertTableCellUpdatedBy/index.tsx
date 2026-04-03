import type { Alert } from '@/server/api/entity/alert/types';

export default function AlertTableCellUpdatedBy({
  data,
  userMap,
}: {
  data?: Alert;
  userMap: Record<string, string>;
}) {
  if (!data?.last_updated_by) return null;
  return <span>{userMap[data.last_updated_by] ?? data.last_updated_by}</span>;
}
