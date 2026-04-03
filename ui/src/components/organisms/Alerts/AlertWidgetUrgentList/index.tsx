'use client';
import NextLink from '@/components/atoms/NextLink';
import { AlertBadgeRisk } from '@/components/organisms/Alerts/AlertBadgeRisk';
import { ALERTS_PAGE } from '@/lib/constants/common';
import { useAlertsPagination } from '@/server/api/entity/alert/queries';
import { Skeleton } from '@/ui/skeleton';

export function AlertWidgetUrgentList() {
  const { data: pagination, isLoading } = useAlertsPagination({
    pageSize: 4,
    orderBy: 'created_at',
  });

  const data = pagination?.items || [];

  if (isLoading) return <Skeleton className='w-full h-full bg-muted' />;

  return (
    <div className='space-y-4 divide-y divide-border max-h-[440px] overflow-y-auto'>
      {data.map((alert) => (
        <NextLink
          href={`${ALERTS_PAGE}/${alert.id}`}
          key={alert.id}
          className='flex gap-4 justify-between items-start pb-4 last:pb-0'
        >
          <div className='flex flex-col gap-0.5'>
            <p className='font-medium text-sm'>{alert.title}</p>
            <p className='text-sm text-muted-foreground line-clamp-2'>{alert.description}</p>
          </div>
          <div className='w-[70px] shrink-0 flex justify-end'>
            <AlertBadgeRisk data={alert} />
          </div>
        </NextLink>
      ))}
    </div>
  );
}
