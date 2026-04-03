'use client';

import Tooltip from '@/components/molecules/Tooltip';
import type { Source } from '@/server/api/entity/source/types';
import * as React from 'react';

export default function SourceTableCellContentTypes({ data }: { data: Source | null }) {
  const contentTypes = data?.content_types ?? [];
  if (!contentTypes || !contentTypes.length) return null;

  const first = contentTypes[0]?.name;
  const restCount = contentTypes.length - 1;
  const displayText = restCount > 0 ? `${first}, +${restCount}` : first;
  const fullText = contentTypes.map((ct) => ct.name).join(', ');

  return <Tooltip triggerElement={displayText}>{fullText}</Tooltip>;
}
