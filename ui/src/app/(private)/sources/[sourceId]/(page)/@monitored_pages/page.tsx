'use client';

import WidgetCard from '@/components/molecules/WidgetCard';
import { useSource } from '@/server/api/entity/source/queries';
import type { Source } from '@/server/api/entity/source/types';
import { Files } from 'lucide-react';
import { useParams } from 'next/navigation';
import React from 'react';

export default function WidgetMonitoredPages() {
  const params = useParams<{ sourceId: string }>();
  const sourceId = params?.sourceId?.toString();
  if (!sourceId) return null;
  const { data: source } = useSource(sourceId as Source['id']);
  if (!source) return null;
  return (
    <WidgetCard icon={Files} title='Monitored pages'>
      <div className='text-2xl font-bold'>{source.pages_count}</div>
    </WidgetCard>
  );
}
