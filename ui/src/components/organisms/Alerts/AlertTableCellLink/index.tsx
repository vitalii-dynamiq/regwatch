'use client';
import TableCellLink from '@/components/molecules/TableCellLink';
import Tooltip from '@/components/molecules/Tooltip';
import { ALERTS_PAGE } from '@/lib/constants/common';
import type { Alert } from '@/server/api/entity/alert/types';
import * as React from 'react';

export default function AlertTableCellLink({ data }: { data: Alert | null }) {
  if (!data) return null;
  return (
    <TableCellLink href={`${ALERTS_PAGE}/${data.id}`}>
      <Tooltip triggerElement={data.title} className='cursor-pointer'>
        {data.title}
      </Tooltip>
    </TableCellLink>
  );
}
