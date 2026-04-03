'use client';
import TableCellLink from '@/components/molecules/TableCellLink';
import type { SourcePageAlert } from '@/components/organisms/SourcePageAlerts/SourcePageAlertTable/types';
import * as React from 'react';

export default function SourcePageAlertTableCellLink({
  data,
  pathname,
}: { data: SourcePageAlert | null; pathname: string }) {
  if (!data) return null;
  return <TableCellLink href={`${pathname}/${data.id}`}>{data.changeName}</TableCellLink>;
}
