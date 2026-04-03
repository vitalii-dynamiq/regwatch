'use client';

import type { DataTableWithActionsProps } from '@/components/molecules/DataTableWithActions/types';
import SourceDropdownAction from '@/components/organisms/Sources/SourceDropdownAction';
import SourceMonitorSwitch from '@/components/organisms/Sources/SourceSwitchMonitor';
import SourceTableCellContentTypes from '@/components/organisms/Sources/SourceTableCellContentTypes';
import SourceTableCellLink from '@/components/organisms/Sources/SourceTableCellLink';
import SourceTableHeadCheckbox from '@/components/organisms/Sources/SourceTableHeadCheckbox';
import SourceTableRowCheckbox from '@/components/organisms/Sources/SourceTableRowCheckbox';
import { DataTableWithActionWrapper } from '@/components/templates/DataTableWithActionWrapper';
import { SOURCES_PAGE } from '@/lib/constants/common';
import type { SearchParamsQuery } from '@/lib/constants/searchParams';
import { useSourcesPagination } from '@/server/api/entity/source/queries';
import type { SourceListItem } from '@/server/api/entity/source/types';
import * as React from 'react';

export function SourcesTable({ searchParams }: { searchParams: SearchParamsQuery }) {
  const { data: pagination } = useSourcesPagination(searchParams);

  const data = pagination?.items || [];

  // TODO: use real data
  const columns: DataTableWithActionsProps<SourceListItem>['columns'] = [
    {
      id: 'select',
      header: {
        name: <SourceTableHeadCheckbox />,
        sorting: undefined,
      },
      actions: {
        custom: <SourceTableRowCheckbox data={null} />,
      },
      pin: 'left',
      size: 32,
    },
    {
      id: 'name',
      header: { name: 'Name', sorting: true },
      actions: {
        custom: <SourceTableCellLink data={null} />,
      },
      pin: 'left',
    },
    {
      id: 'jurisdiction.name',
      header: { name: 'Jurisdiction', sorting: false },
      type: 'text',
    },
    {
      id: 'content_types',
      header: { name: 'Content types', sorting: false },
      actions: {
        custom: <SourceTableCellContentTypes data={null} />,
      },
    },
    {
      id: 'monitoring_enabled',
      header: { name: 'Monitor' },
      actions: {
        custom: <SourceMonitorSwitch data={null} />,
      },
    },
    {
      id: 'monitoring_frequency.name',
      header: { name: 'Frequency', sorting: false },
      type: 'text',
    },
    {
      id: 'description',
      header: { name: 'Description', sorting: true },
      type: 'tooltip',
    },
    // commented on due to customer request
    // {
    //   id: 'last_monitoring_started_at',
    //   header: { name: 'Last Monitoring Started', sorting: false },
    //   type: 'datetime',
    // },
    {
      id: 'last_monitoring_completed_at',
      header: { name: 'Last monitoring date', sorting: false },
      type: 'datetime',
    },
    {
      id: 'actions',
      header: {
        name: '',
      },
      actions: {
        custom: <SourceDropdownAction data={null} />,
      },
      pin: 'right',
    },
  ];

  return <DataTableWithActionWrapper<SourceListItem> columns={columns} data={data} href={SOURCES_PAGE} />;
}
