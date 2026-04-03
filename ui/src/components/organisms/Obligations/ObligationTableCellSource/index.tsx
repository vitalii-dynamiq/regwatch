import { TableCellTitleAndLink } from '@/components/molecules/TableCellTitleAndLink';
import type { Obligation } from '@/server/api/entity/obligation/types';

export default function ObligationTableCellSource({ data }: { data: Obligation | null }) {
  if (!data) return null;
  if (!data.source) return null;
  if (!data.source.name) return null;
  return <TableCellTitleAndLink title={data.source.name} url={data?.source?.base_url} />;
}
