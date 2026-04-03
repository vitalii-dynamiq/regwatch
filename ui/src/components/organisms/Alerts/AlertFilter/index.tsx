import { AlertFilterDropdown } from '@/components/organisms/Alerts/AlertFilterDropdown';
import { AlertFilterSearch } from '@/components/organisms/Alerts/AlertFilterSearch';
import AlertTableRowSelected from '@/components/organisms/Alerts/AlertTableRowSelected';
import * as React from 'react';

export function AlertFilter() {
  return (
    <div className='flex justify-between items-center w-full flex-col md:flex-row'>
      <div className='flex gap-3 items-center my-4'>
        <AlertFilterSearch />
        <AlertFilterDropdown />
      </div>
      <AlertTableRowSelected />
    </div>
  );
}
