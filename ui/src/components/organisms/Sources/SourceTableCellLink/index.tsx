'use client';
import TableCellLink from '@/components/molecules/TableCellLink';
import { TableCellTitleAndLink } from '@/components/molecules/TableCellTitleAndLink';
import { SOURCES_PAGE } from '@/lib/constants/common';
import type { Source } from '@/server/api/entity/source/types';

export default function SourceTableCellLink({ data }: { data: Source | null }) {
  if (!data) return null;
  if (!data.id && !data.name) return null;
  return (
    <TableCellLink href={`${SOURCES_PAGE}/${data.id}`}>
      <TableCellTitleAndLink title={data.name} url={data.base_url} />
    </TableCellLink>
  );
}
