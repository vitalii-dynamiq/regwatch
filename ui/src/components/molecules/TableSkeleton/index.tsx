import { Skeleton } from '@/ui/skeleton';

export function TableSkeleton() {
  return (
    <>
      <div className='flex gap-4 mt-6'>
        <Skeleton className='h-10 w-80' />
        <Skeleton className='h-10 w-20' />
      </div>
      <Skeleton className='flex-1 w-full mt-6' />
    </>
  );
}
