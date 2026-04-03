import { TableCellTitleAndLink } from '@/components/molecules/TableCellTitleAndLink';
import type { Alert } from '@/server/api/entity/alert/types';

export default function AlertTableCellSource({ data }: { data: Alert | null }) {
  if (!data) return null;
  if (!data.source) return null;
  if (!data.source.name) return null;
  return <TableCellTitleAndLink title={data.source.name} url={data?.source?.base_url} />;
}
