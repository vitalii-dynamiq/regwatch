'use client';

import type { DataTableWithActionsProps } from '@/components/molecules/DataTableWithActions/types';
import SourcePageTableCellPageName from '@/components/organisms/SourcePages/SourcePageTableCellPageName';
import { DataTableWithActionWrapper } from '@/components/templates/DataTableWithActionWrapper';
import type { SearchParamsQuery } from '@/lib/constants/searchParams';
import { useSourcePagesPagination } from '@/server/api/entity/sourcePages/queries';
import type { SourcePage } from '@/server/api/entity/sourcePages/types';
import { usePathname } from 'next/navigation';
import * as React from 'react';

export function SourcePagesTable({ searchParams }: { searchParams: SearchParamsQuery }) {
  const pathname = usePathname();
  const { data: pagination } = useSourcePagesPagination(searchParams);

  const data = pagination?.items || [];

  const columns: DataTableWithActionsProps<SourcePage>['columns'] = [
    {
      id: 'page',
      header: { name: 'Page', sorting: false },
      actions: {
        custom: <SourcePageTableCellPageName data={null} />,
      },
    },
    {
      id: 'alerts_count',
      header: { name: 'Alerts', sorting: false },
      type: 'text',
      pin: 'right',
      size: 32,
    },
    //TODO: add it when backend will be ready
    // {
    //   id: 'actions',
    //   header: {
    //     name: '',
    //   },
    //   actions: {
    //     custom: <SourcePagesDropdownAction data={null} pathname={pathname} />,
    //   },
    //   pin: 'right',
    //   size: 32,
    // },
  ];

  return <DataTableWithActionWrapper<SourcePage> columns={columns} data={data} href={pathname} className='mt-4' />;
}
