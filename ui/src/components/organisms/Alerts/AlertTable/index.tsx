'use client';

import type { DataTableWithActionsProps } from '@/components/molecules/DataTableWithActions/types';
import { AlertBadgeRisk } from '@/components/organisms/Alerts/AlertBadgeRisk';
import { AlertBadgeStatus } from '@/components/organisms/Alerts/AlertBadgeStatus';
import AlertDropdownAction from '@/components/organisms/Alerts/AlertDropdownAction';
import AlertTableCellAssignedTo from '@/components/organisms/Alerts/AlertTableCellAssignedTo';
import AlertTableCellLink from '@/components/organisms/Alerts/AlertTableCellLink';
import AlertTableCellSource from '@/components/organisms/Alerts/AlertTableCellSource';
import AlertTableCellUpdatedBy from '@/components/organisms/Alerts/AlertTableCellUpdatedBy';
import AlertTableHeadCheckbox from '@/components/organisms/Alerts/AlertTableHeadCheckbox';
import AlertTableRowCheckbox from '@/components/organisms/Alerts/AlertTableRowCheckbox';
import { DataTableWithActionWrapper } from '@/components/templates/DataTableWithActionWrapper';
import { ALERTS_PAGE } from '@/lib/constants/common';
import type { SearchParamsQuery } from '@/lib/constants/searchParams';
import { useAlertsPagination } from '@/server/api/entity/alert/queries';
import type { Alert } from '@/server/api/entity/alert/types';
import { useUsersPagination } from '@/server/api/entity/user/queries';
import * as React from 'react';

export function AlertTable({ searchParams }: { searchParams: SearchParamsQuery }) {
  const { data: pagination } = useAlertsPagination(searchParams);

  const data = pagination?.items || [];

  const { data: usersPagination } = useUsersPagination({
    pageSize: 1000,
    orderBy: 'created_at',
  });

  const users = usersPagination?.items || [];

  const userMap = React.useMemo(
    () => Object.fromEntries((users ?? []).map((u) => [u.id, `${u.first_name} ${u.last_name}`.trim()])),
    [users]
  );

  const columns: DataTableWithActionsProps<Alert>['columns'] = [
    {
      id: 'select',
      header: {
        name: <AlertTableHeadCheckbox />,
        sorting: undefined,
      },
      actions: {
        custom: <AlertTableRowCheckbox data={null} />,
      },
      pin: 'left',
      size: 32,
    },
    {
      id: 'title',
      header: { name: 'Title', sorting: false },
      actions: {
        custom: <AlertTableCellLink data={null} />,
      },
      pin: 'left',
    },
    {
      id: 'risk_level.name',
      header: { name: 'Risk level', sorting: false },
      actions: {
        custom: <AlertBadgeRisk data={null} />,
      },
    },
    {
      id: 'alert_type.name',
      header: { name: 'Alert type', sorting: false },
      type: 'text',
    },
    {
      id: 'status.name',
      header: { name: 'Status', sorting: false },
      actions: {
        custom: <AlertBadgeStatus data={null} />,
      },
    },
    {
      id: 'content_type.name',
      header: { name: 'Content type', sorting: false },
      type: 'text',
    },
    {
      id: 'due_date',
      header: { name: 'Due date', sorting: false },
      type: 'datetime',
    },
    {
      id: 'effective_date',
      header: { name: 'Effective date', sorting: false },
      type: 'datetime',
    },
    {
      id: 'source.name',
      header: { name: 'Source', sorting: false },
      actions: {
        custom: <AlertTableCellSource data={null} />,
      },
    },
    {
      id: 'detected_at',
      header: { name: 'Detected at', sorting: false },
      type: 'datetime',
    },
    {
      id: 'completed_at',
      header: { name: 'Completed at', sorting: false },
      type: 'datetime',
    },
    {
      id: 'assigned_to',
      header: { name: 'Assigned to', sorting: false },
      actions: {
        custom: <AlertTableCellAssignedTo userMap={userMap} />,
      },
    },
    {
      id: 'assigned_at',
      header: { name: 'Assigned at', sorting: false },
      type: 'datetime',
    },
    {
      id: 'last_updated_by',
      header: { name: 'Updated by', sorting: false },
      actions: {
        custom: <AlertTableCellUpdatedBy userMap={userMap} />,
      },
    },
    {
      id: 'actions',
      header: {
        name: '',
      },
      actions: {
        custom: <AlertDropdownAction data={null} />,
      },
      pin: 'right',
    },
  ];

  return <DataTableWithActionWrapper<Alert> columns={columns} data={data} href={ALERTS_PAGE} />;
}
