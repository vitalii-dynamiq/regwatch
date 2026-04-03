'use client';

import { FilterDropdown } from '@/components/molecules/FilterDropdown';
import type { FilterDropdownProps } from '@/components/molecules/FilterDropdown/types';
import { SOURCES_PAGE } from '@/lib/constants/common';
import SearchParams from '@/lib/constants/searchParams';
import { useSourceAssets } from '@/server/api/entity/sourceAssets/queries';
import * as React from 'react';

export function SourceFilterDropdown() {
  const { data, isLoading } = useSourceAssets();

  // Build filters only when data changes
  const filters: FilterDropdownProps['filters'] = React.useMemo<FilterDropdownProps['filters']>(() => {
    return [
      {
        key: SearchParams.jurisdictionName,
        label: 'Jurisdictions',
        options:
          data?.jurisdictions?.map((obligation_type) => ({
            label: obligation_type.name,
            value: String(obligation_type.id),
          })) ?? [],
        multiple: true,
      },
      {
        key: SearchParams.monitoringFrequency,
        label: 'Monitoring frequency',
        options:
          data?.monitoring_frequency?.map((obligation_type) => ({
            label: obligation_type.name,
            value: String(obligation_type.id),
          })) ?? [],
        multiple: false,
      },
    ];
  }, [data]);

  if (isLoading) {
    return (
      <div className='flex gap-3 items-center my-4' role='status' aria-busy='true'>
        Loading filters...
      </div>
    );
  }

  return <FilterDropdown href={SOURCES_PAGE} filters={filters} />;
}
