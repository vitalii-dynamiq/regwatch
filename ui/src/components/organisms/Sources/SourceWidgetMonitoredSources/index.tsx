'use client';
import { useDashboardWidgets } from '@/server/api/entity/dashboard/queries';
import { Skeleton } from '@/ui/skeleton';

export function SourceWidgetMonitoredSources() {
  const { data, isLoading } = useDashboardWidgets();

  if (isLoading || !data) return <Skeleton className='w-full h-full bg-muted' />;

  return (
    <div className='flex flex-col justify-center flex-1'>
      <p className='text-4xl font-semibold'>{data.sources_count}</p>
      <div className='text-sm text-foreground mt-4 flex justify-between items-center'>
        <p>Active</p>
        <p className='text-muted-foreground'>
          {data.active_sources_count}/{data.sources_count}
        </p>
      </div>
    </div>
  );
}
