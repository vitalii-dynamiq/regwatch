'use client';

import WidgetCard from '@/components/molecules/WidgetCard';
import { useSource } from '@/server/api/entity/source/queries';
import type { Source } from '@/server/api/entity/source/types';
import { FileText } from 'lucide-react';
import { useParams } from 'next/navigation';
import React from 'react';

export default function WidgetNewObligations() {
  const params = useParams<{ sourceId: string }>();
  const sourceId = params?.sourceId?.toString();
  if (!sourceId) return null;
  const { data: source } = useSource(sourceId as Source['id']);
  if (!source) return null;
  return (
    <WidgetCard icon={FileText} title='New obligations'>
      <div className='text-2xl font-bold'>{source.obligations_count}</div>
      <p className='text-xs text-muted-foreground'>Last 30 days</p>
    </WidgetCard>
  );
}
