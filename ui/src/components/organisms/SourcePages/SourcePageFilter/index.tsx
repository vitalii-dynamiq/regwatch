'use client';

import { FilterDropdown } from '@/components/molecules/FilterDropdown';
import SearchParams from '@/lib/constants/searchParams';
import { usePathname } from 'next/navigation';
import * as React from 'react';

export function SourcePagesFilter() {
  const pathname = usePathname();
  const filters = [
    {
      key: SearchParams.isRegulatory,
      label: 'Regulatory',
      options: [
        { label: 'Yes', value: '1' },
        { label: 'No', value: '0' },
      ],
    },
  ];

  return (
    <div className='flex gap-3 items-center my-4'>
      <FilterDropdown href={pathname} filters={filters} />
    </div>
  );
}
