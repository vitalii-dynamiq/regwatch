import { ObligationFilterDropdown } from '@/components/organisms/Obligations/ObligationFilterDropdown';
import { ObligationFilterSearch } from '@/components/organisms/Obligations/ObligationFilterSearch';
import ObligationTableRowSelected from '@/components/organisms/Obligations/ObligationTableRowSelected';
import * as React from 'react';

export function ObligationFilter() {
  return (
    <div className='flex justify-between items-center w-full flex-col md:flex-row'>
      <div className='flex flex-row !gap-3 items-center my-4'>
        <ObligationFilterSearch />
        <ObligationFilterDropdown />
      </div>
      <ObligationTableRowSelected />
    </div>
  );
}
