'use client';

import type { PageSizeSelectProps } from '@/components/molecules/PageSizeSelect/types';
import PAGINATION from '@/lib/constants/pagination';
import type { SearchParamsQuery } from '@/lib/constants/searchParams';
import { buildUrlQueryParams } from '@/lib/helpers/buildUrlQueryParams';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select';
import { useRouter } from 'next/navigation';

export function PageSizeSelect<T>({ href, searchParams }: PageSizeSelectProps<T>) {
  const router = useRouter();
  const pageSize = searchParams.pageSize || (PAGINATION.PAGE_SIZES[0] as SearchParamsQuery['pageSize']);

  return (
    <div className='flex items-center gap-2'>
      <span className='text-sm text-muted-foreground'>Rows per page</span>
      <Select
        value={String(pageSize)}
        onValueChange={(_value) => {
          router.push(buildUrlQueryParams(href, { ...searchParams, pageSize: Number(_value) }));
        }}
      >
        <SelectTrigger className='h-8 w-[70px]'>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {PAGINATION.PAGE_SIZES.map((size) => (
            <SelectItem key={size} value={String(size)}>
              {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
