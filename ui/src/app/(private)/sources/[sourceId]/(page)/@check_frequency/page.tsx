'use client';

import { BadgeActive } from '@/components/molecules/BadgeActive';
import { useSource } from '@/server/api/entity/source/queries';
import type { Source } from '@/server/api/entity/source/types';
import { useSourceAssets } from '@/server/api/entity/sourceAssets/queries';
import { useParams } from 'next/navigation';
import React from 'react';

export default function SourcePageCheckFrequency() {
  const params = useParams<{ sourceId: string }>();
  const sourceId = params?.sourceId?.toString();

  const { data: source } = useSource(sourceId as Source['id']);
  const { data: assets } = useSourceAssets();

  const frequency =
    assets?.monitoring_frequency?.find((f) => f.id === source?.monitoring_frequency.id)?.name ??
    source?.monitoring_frequency.name;

  const isMonitoringActive = Boolean(source?.monitoring_enabled);

  return (
    <div className='flex items-center gap-2'>
      {frequency && (
        <div>
          <span className='font-semibold'>Check frequency: </span>
          {frequency}
        </div>
      )}
      <BadgeActive active={isMonitoringActive} />
    </div>
  );
}
