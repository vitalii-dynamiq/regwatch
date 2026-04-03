'use client';

import { useDashboardWidgets } from '@/server/api/entity/dashboard/queries';
import { Skeleton } from '@/ui/skeleton';

export function ObligationWidgetCount() {
  const { data, isLoading } = useDashboardWidgets();

  if (!data || isLoading) return <Skeleton className='w-full h-full bg-muted' />;

  return (
    <div className='flex flex-col justify-center flex-1'>
      <p className='text-4xl font-semibold'>{data.obligations_count}</p>
      <div className='text-sm text-foreground flex justify-between items-cente mt-4'>
        <p>Resolved</p>
        <p className='text-muted-foreground'>
          {data.resolved_obligations_count}/{data.obligations_count}
        </p>
      </div>
    </div>
  );
}
