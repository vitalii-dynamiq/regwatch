'use client';

import { FilterDropdown } from '@/components/molecules/FilterDropdown';
import type { FilterDropdownProps } from '@/components/molecules/FilterDropdown/types';
import { ALERTS_PAGE } from '@/lib/constants/common';
import SearchParams from '@/lib/constants/searchParams';
import { useAlertAssets } from '@/server/api/entity/alertAssets/queries';
import type { AlertAsset } from '@/server/api/entity/alertAssets/types';
import { useSourcesPagination } from '@/server/api/entity/source/queries';
import { useUsersPagination } from '@/server/api/entity/user/queries';
import * as React from 'react';

export function AlertFilterDropdown() {
  const { data, isLoading } = useAlertAssets();

  const { data: usersPagination } = useUsersPagination({
    pageSize: 1000,
    orderBy: 'created_at',
  });
  const users = usersPagination?.items || [];

  const { data: sourcePagination } = useSourcesPagination({
    pageSize: 1000,
    orderBy: 'name',
  });

  const sources = sourcePagination?.items || [];

  // Build filters only when data changes
  const filters: FilterDropdownProps['filters'] = React.useMemo<FilterDropdownProps['filters']>(() => {
    return [
      {
        key: SearchParams.riskLevel,
        label: 'Risk level',
        options:
          data?.risk_levels?.map((risk_level: AlertAsset['risk_levels'][0]) => ({
            label: risk_level.name,
            value: String(risk_level.id),
          })) ?? [],
        multiple: false,
      },
      {
        key: SearchParams.status,
        label: 'Status',
        options:
          data?.statuses?.map((status: AlertAsset['statuses'][0]) => ({
            label: status.name,
            value: String(status.id),
          })) ?? [],
        multiple: false,
      },
      {
        key: SearchParams.alertType,
        label: 'Alert type',
        options:
          data?.alert_types?.map((alert_type: AlertAsset['alert_types'][0]) => ({
            label: alert_type.name,
            value: String(alert_type.id),
          })) ?? [],
        multiple: false,
      },
      {
        key: SearchParams.assignedTo,
        label: 'Assigned to',
        options:
          users?.map((j) => ({
            value: String(j.id),
            label: `${j.first_name} ${j.last_name}`,
          })) ?? [],
        multiple: false,
      },
      {
        key: SearchParams.sourceIn,
        label: 'Sources',
        options:
          sources?.map((j) => ({
            value: String(j.id),
            label: `${j.name}`,
          })) ?? [],
        multiple: true,
      },
      {
        key: SearchParams.contentTypeIn,
        label: 'Content types',
        options:
          data?.content_types?.map((j) => ({
            value: String(j.id),
            label: `${j.name}`,
          })) ?? [],
        multiple: true,
      },
    ];
  }, [data, users, sources]);

  if (isLoading) {
    return (
      <div className='flex gap-3 items-center my-4' role='status' aria-busy='true'>
        Loading filters...
      </div>
    );
  }

  return <FilterDropdown filters={filters} href={ALERTS_PAGE} />;
}
