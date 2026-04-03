'use client';

import { FilterDropdown } from '@/components/molecules/FilterDropdown';
import type { FilterDropdownProps } from '@/components/molecules/FilterDropdown/types';
import { OBLIGATIONS_PAGE } from '@/lib/constants/common';
import SearchParams from '@/lib/constants/searchParams';
import { useObligationAssets } from '@/server/api/entity/obligationAssets/queries';
import { useSourcesPagination } from '@/server/api/entity/source/queries';
import { useUsersPagination } from '@/server/api/entity/user/queries';
import * as React from 'react';

export function ObligationFilterDropdown() {
  const { data, isLoading } = useObligationAssets();
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
        key: SearchParams.status,
        label: 'Status',
        options: data?.statuses?.map((s) => ({ label: s.name, value: String(s.id) })) ?? [],
        multiple: false,
      },
      {
        key: SearchParams.riskLevel,
        label: 'Risk',
        options: data?.risk_levels?.map((risk) => ({ label: risk.name, value: String(risk.id) })) ?? [],
        multiple: false,
      },
      {
        key: SearchParams.obligationType,
        label: 'Obligation type',
        options:
          data?.obligation_types?.map((obligation_type) => ({
            label: obligation_type.name,
            value: String(obligation_type.id),
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
        multiple: false,
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
  return <FilterDropdown href={OBLIGATIONS_PAGE} filters={filters} />;
}
