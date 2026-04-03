'use client';

import type { SourcePage } from '@/server/api/entity/sourcePages/types';

export default function SourcePageTableCellPageName({ data }: { data: SourcePage | null }) {
  if (!data) return null;
  if (!data.id) return null;
  return (
    // TODO: add it when backend will be ready
    // <TableCellLink href={`${pathname}/${data.id}`}>
    <>{data?.path && <p className='text-sm text-muted-foreground truncate max-w-5/6'>{data?.path}</p>}</>
    // </TableCellLink>
  );
}
