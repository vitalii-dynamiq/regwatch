'use client';
import TableCellLink from '@/components/molecules/TableCellLink';
import Tooltip from '@/components/molecules/Tooltip';
import { OBLIGATIONS_PAGE } from '@/lib/constants/common';
import type { Obligation } from '@/server/api/entity/obligation/types';
import * as React from 'react';

export default function ObligationTableCellLink({ data }: { data: Obligation | null }) {
  if (!data) return null;
  return (
    <TableCellLink href={`${OBLIGATIONS_PAGE}/${data.id}`}>
      <Tooltip triggerElement={data.title} className='cursor-pointer'>
        {data.title}
      </Tooltip>
    </TableCellLink>
  );
}
