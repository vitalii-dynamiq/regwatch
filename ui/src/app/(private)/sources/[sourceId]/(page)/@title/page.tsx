'use client';

import Title from '@/components/atoms/Title';
import { useSource } from '@/server/api/entity/source/queries';
import { useParams } from 'next/navigation';
import React from 'react';

export default function SourcePageTitle() {
  // Read and normalize the dynamic route param from Next.js
  const params = useParams<{ sourceId?: string | string[] }>();
  const sourceId = Array.isArray(params?.sourceId) ? params?.sourceId?.[0] : params?.sourceId;

  // Fetch the source only when we have a valsourceId sourceId (handled by the hook's enabled flag)
  const { data: source } = useSource(sourceId ?? '');

  return (
    <>
      {source?.name && (
        <>
          <Title level={3}>{source?.name ?? ''}</Title>
        </>
      )}
    </>
  );
}
