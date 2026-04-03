import { TableSkeleton } from '@/components/molecules/TableSkeleton';
import { Skeleton } from '@/ui/skeleton';

export default function Loading() {
  return (
    <div className='flex flex-col min-h-[calc(100vh-196px)]'>
      <Skeleton className='h-[38px] w-full md:w-[938px]' />
      <TableSkeleton />
    </div>
  );
}
