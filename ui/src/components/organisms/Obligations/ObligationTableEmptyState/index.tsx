import { Inbox } from 'lucide-react';

export function ObligationTableEmptyState() {
  return (
    <div className='w-full h-44 border border-border border-dashed p-6 flex flex-col items-center rounded-lg'>
      <div className='w-12 h-12 flex items-center justify-center shadow-sm border-border border rounded-md'>
        <Inbox className='h-5 w-5 text-foreground' />
      </div>
      <p className='text-xl font-semibold text-foreground mt-6'>No obligations added</p>
      <p className='text-muted-foreground text-sm mt-2'>Obligations will be displayed here</p>
    </div>
  );
}
