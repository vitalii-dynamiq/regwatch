'use client';

import { FilterDropdown } from '@/components/molecules/FilterDropdown';
import { InputSearch } from '@/components/molecules/InputSearch';
import * as React from 'react';

const filters = [
  {
    key: 'impact',
    label: 'Impact',
    options: [
      { label: 'High', value: 'high' },
      { label: 'Medium', value: 'medium' },
      { label: 'Low', value: 'low' },
    ],
    multiple: true,
  },
];

export function SourcePageAlertFilter() {
  return (
    <div className='flex gap-3 items-center my-4'>
      <InputSearch paramKey='search' />
      <FilterDropdown href='#' filters={filters} />
    </div>
  );
}
