'use client';

import WidgetCard from '@/components/molecules/WidgetCard';
import { useSource } from '@/server/api/entity/source/queries';
import type { Source } from '@/server/api/entity/source/types';
import { ScanSearch } from 'lucide-react';
import { useParams } from 'next/navigation';
import React from 'react';

export default function WidgetDetectedAlerts() {
  const params = useParams<{ sourceId: string }>();
  const sourceId = params?.sourceId?.toString();
  if (!sourceId) return null;
  const { data: source } = useSource(sourceId as Source['id']);
  if (!source) return null;
  return (
    <WidgetCard icon={ScanSearch} title='Detected alerts'>
      <div className='text-2xl font-bold'>{source.alerts_count}</div>
      <p className='text-xs text-muted-foreground'>Last 7 days</p>
    </WidgetCard>
  );
}
