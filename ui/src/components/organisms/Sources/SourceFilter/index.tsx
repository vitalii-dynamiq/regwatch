import { SourceFilterDropdown } from '@/components/organisms/Sources/SourceFilterDropdown';
import { SourceFilterSearch } from '@/components/organisms/Sources/SourceFilterSearch';
import SourceTableRowSelected from '@/components/organisms/Sources/SourceTableRowSelected';
import * as React from 'react';

export function SourcesFilter() {
  return (
    <div className='flex justify-between items-center w-full flex-col md:flex-row'>
      <div className='flex gap-3 items-center my-4'>
        <SourceFilterSearch />
        <SourceFilterDropdown />
      </div>
      <SourceTableRowSelected />
    </div>
  );
}
