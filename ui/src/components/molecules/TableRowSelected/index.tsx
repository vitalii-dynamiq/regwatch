'use client';

import { AlertDialog } from '@/components/molecules/AlertDialog';
import type { TableRowSelectedProps } from '@/components/molecules/TableRowSelected/types';
import { Separator } from '@/ui/separator';
import { X } from 'lucide-react';

export default function TableRowSelected({ selected, children, clearAllSelected }: TableRowSelectedProps) {
  if (!selected) return null;
  const handleClick = () => {
    clearAllSelected();
  };

  return (
    <div className='flex items-center gap-2 py-4'>
      <AlertDialog
        title='Clear all selected items'
        description='Are you sure you want to clear all selected items?'
        triggerButton={{
          variant: 'ghost',
          size: 'sm',
          label: (
            <>
              <X size={14} /> {selected} selected items
            </>
          ),
        }}
        actionButton={{
          label: 'Clear all',
          onClick: handleClick,
        }}
      ></AlertDialog>
      <Separator orientation='vertical' className='mx-2 data-[orientation=vertical]:h-4' />
      {children}
    </div>
  );
}
