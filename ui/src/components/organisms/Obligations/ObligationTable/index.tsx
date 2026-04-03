'use client';

import type { DataTableWithActionsProps } from '@/components/molecules/DataTableWithActions/types';

import { ObligationBadgeRisk } from '@/components/organisms/Obligations/ObligationBadgeRisk';
import ObligationDropdownAction from '@/components/organisms/Obligations/ObligationDropdownAction';
import ObligationTableCellLink from '@/components/organisms/Obligations/ObligationTableCellLink';
import ObligationTableCellSource from '@/components/organisms/Obligations/ObligationTableCellSource';
import { ObligationTableCellStatusBadge } from '@/components/organisms/Obligations/ObligationTableCellStatusBadge';
import ObligationTableCellUpdatedBy from '@/components/organisms/Obligations/ObligationTableCellUpdatedBy';
import ObligationTableHeadCheckbox from '@/components/organisms/Obligations/ObligationTableHeadCheckbox';
import ObligationTableRowCheckbox from '@/components/organisms/Obligations/ObligationTableRowCheckbox';
import { DataTableWithActionWrapper } from '@/components/templates/DataTableWithActionWrapper';
import { OBLIGATIONS_PAGE } from '@/lib/constants/common';
import type { SearchParamsQuery } from '@/lib/constants/searchParams';
import { useObligationsPagination } from '@/server/api/entity/obligation/queries';
import type { Obligation } from '@/server/api/entity/obligation/types';
import { useUsersPagination } from '@/server/api/entity/user/queries';
import * as React from 'react';
import ObligationTableCellAssignedTo from '../ObligationTableCellAssignedTo';

export function ObligationsTable({ searchParams }: { searchParams: SearchParamsQuery }) {
  const { data: pagination } = useObligationsPagination(searchParams);

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

  const columns: DataTableWithActionsProps<Obligation>['columns'] = [
    {
      id: 'select',
      header: {
        name: <ObligationTableHeadCheckbox />,
        sorting: undefined,
      },
      actions: {
        custom: <ObligationTableRowCheckbox data={null} />,
      },
      pin: 'left',
      size: 32,
    },
    {
      id: 'title',
      header: { name: 'Title', sorting: false },
      actions: {
        custom: <ObligationTableCellLink data={null} />,
      },
      pin: 'left',
    },
    {
      id: 'risk_level.name',
      header: { name: 'Risk level', sorting: false },
      actions: {
        custom: <ObligationBadgeRisk />,
      },
    },
    {
      id: 'obligation_type.name',
      header: { name: 'Obligation type', sorting: false },
      type: 'text',
    },
    {
      id: 'status.name',
      header: { name: 'Status', sorting: false },
      actions: {
        custom: <ObligationTableCellStatusBadge />,
      },
    },
    {
      id: 'due_date',
      header: { name: 'Due date', sorting: false },
      type: 'datetime',
    },
    {
      id: 'source.name',
      header: { name: 'Source', sorting: false },
      actions: {
        custom: <ObligationTableCellSource data={null} />,
      },
    },
    {
      id: 'content_type.name',
      header: { name: 'Content type', sorting: false },
      type: 'text',
    },
    {
      id: 'effective_date',
      header: { name: 'Effective date', sorting: false },
      type: 'datetime',
    },
    {
      id: 'assigned_to',
      header: { name: 'Assigned to', sorting: false },
      actions: {
        custom: <ObligationTableCellAssignedTo userMap={userMap} />,
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
        custom: <ObligationTableCellUpdatedBy userMap={userMap} />,
      },
    },
    // {
    //   id: 'description',
    //   header: { name: 'Description', sorting: false },
    //   type: 'text',
    // },
    {
      id: 'actions',
      header: {
        name: '',
      },
      actions: {
        custom: <ObligationDropdownAction data={null} />,
      },
      pin: 'right',
    },
  ];

  return <DataTableWithActionWrapper<Obligation> columns={columns} data={data} href={OBLIGATIONS_PAGE} />;
}
