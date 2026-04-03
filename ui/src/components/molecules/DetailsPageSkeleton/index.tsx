import Title from '@/components/atoms/Title';
import { Skeleton } from '@/ui/skeleton';
import * as React from 'react';

export function DetailsPageSkeleton() {
  return (
    <>
      <Skeleton className='h-8 w-full' />

      <div className='space-y-6 mt-4'>
        <div className='flex flex-col md:flex-row gap-6'>
          <div className='flex-1 flex flex-col'>
            <Title className='mb-4' level={6}>
              Regulatory Details
            </Title>
            <Skeleton className='h-[310px] w-full' />
          </div>

          <div className='flex-1 flex flex-col'>
            <Title className='mb-4' level={6}>
              Assignment & Progress
            </Title>
            <Skeleton className='h-[310px] w-full' />
          </div>
        </div>

        <div className='flex-1 flex flex-col'>
          <Title className='mb-4' level={6}>
            Compliance Summary
          </Title>
          <Skeleton className='h-20 w-full' />
        </div>
      </div>
    </>
  );
}
