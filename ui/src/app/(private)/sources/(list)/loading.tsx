import { TableSkeleton } from '@/components/molecules/TableSkeleton';

export default function Loading() {
  return (
    <div className='flex flex-col min-h-[calc(100vh-196px)]'>
      <TableSkeleton />
    </div>
  );
}
