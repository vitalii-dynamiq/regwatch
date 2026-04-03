'use client';

import NextLink from '@/components/atoms/NextLink';
import Title from '@/components/atoms/Title';
import { BadgeRisk } from '@/components/molecules/BadgeRisk';
import { FormFieldReadOnly } from '@/components/molecules/FormFieldReadOnly';
import { ObligationEditableFieldDatepicker } from '@/components/organisms/Obligations/ObligationEditableFieldDatepicker';
import { ObligationEditableFieldSelect } from '@/components/organisms/Obligations/ObligationEditableFieldSelect';
import { ObligationEditableFieldTextarea } from '@/components/organisms/Obligations/ObligationEditableFieldTextarea';
import { ObligationEditableTextareaRegulatoryMetadata } from '@/components/organisms/Obligations/ObligationEditableTextareaRegulatoryMetadata';
import { Card } from '@/components/ui/card';
import { SOURCES_PAGE } from '@/lib/constants/common';
import { dataFormat } from '@/lib/helpers/dataFormat';
import { formatFieldLabel } from '@/lib/helpers/formatFieldLabel';
import { useObligation } from '@/server/api/entity/obligation/queries';
import type { Obligation } from '@/server/api/entity/obligation/types';
import { useObligationAssets } from '@/server/api/entity/obligationAssets/queries';
import { useSourcesPagination } from '@/server/api/entity/source/queries';
import { useUsersPagination } from '@/server/api/entity/user/queries';
import { Badge } from '@/ui/badge';
import * as React from 'react';

export default function ObligationDetails({ obligation }: { obligation: Obligation }) {
  const { data } = useObligation(obligation.id);
  const currentObligation = data ?? obligation;
  const { data: obligationAssets } = useObligationAssets();
  const { data: usersPagination } = useUsersPagination({
    pageSize: 1000,
    orderBy: 'created_at',
  });

  const users = usersPagination?.items || [];

  const userMap = React.useMemo(
    () => Object.fromEntries((users ?? []).map((u) => [u.id, `${u.first_name} ${u.last_name}`.trim()])),
    [users]
  );

  const assignedUserName = userMap[currentObligation?.assigned_to ?? ''] ?? undefined;
  const updatedUserName = userMap[currentObligation?.last_updated_by ?? ''] ?? undefined;

  const { data: sourcesPagination } = useSourcesPagination({
    pageSize: 1000,
    orderBy: 'name',
  });
  const sources = sourcesPagination?.items || [];

  const { statuses, risk_levels } = obligationAssets || {};

  const statusOptions =
    statuses?.map((s) => ({
      value: String(s.id),
      textValue: s.name,
    })) ?? [];

  const riskLevelOptions =
    risk_levels?.map((r) => ({
      value: String(r.id),
      textValue: r.name,
    })) ?? [];

  const usersOptions =
    users?.map((j) => ({
      value: String(j.id),
      textValue: `${j.first_name} ${j.last_name}`,
    })) ?? [];

  const selectedSourceId = currentObligation?.source?.id;
  const selectedSource = sources.find((s) => s.id === selectedSourceId);
  const contentTypesOptions =
    selectedSource?.content_types?.map((ct) => ({
      value: String(ct.id),
      textValue: ct.name,
    })) ?? [];

  const regulatoryMetadata = currentObligation?.regulatory_metadata
    ? Object.entries(currentObligation?.regulatory_metadata).filter(
        ([, value]) => value !== null && value !== undefined && value !== ''
      )
    : [];

  return (
    <>
      <Title level={3}>{currentObligation?.title}</Title>

      <div className='space-y-6 mt-4'>
        <div className='flex flex-col md:flex-row gap-6'>
          <div className='flex-1 flex flex-col'>
            <Title className='mb-4' level={6}>
              Regulatory Details
            </Title>
            <Card className='flex-1 p-4 md:p-6 gap-4 flex flex-col'>
              <FormFieldReadOnly
                label='Source name'
                defaultValue={currentObligation?.source?.name}
                href={`${SOURCES_PAGE}/${currentObligation?.source?.id}`}
              />
              <FormFieldReadOnly
                label='URL'
                defaultValue={
                  <NextLink href={currentObligation?.source?.base_url ?? '#'} target='_blank'>
                    {currentObligation?.source?.base_url ?? 'No URL'}
                  </NextLink>
                }
              />
              <ObligationEditableFieldSelect
                label='Content type'
                name='content_type'
                defaultValue={String(currentObligation.content_type.id) ?? undefined}
                id={currentObligation.id}
                options={contentTypesOptions}
                inlineLabel
                className='md:w-52'
              >
                {currentObligation.content_type.name}
              </ObligationEditableFieldSelect>
              <ObligationEditableFieldSelect
                label='Risk'
                name='risk_level'
                defaultValue={String(currentObligation?.risk_level?.id) ?? undefined}
                id={currentObligation.id}
                options={riskLevelOptions}
                inlineLabel
              >
                <BadgeRisk risk={currentObligation?.risk_level?.name} />
              </ObligationEditableFieldSelect>
              <FormFieldReadOnly label='Obligation type' defaultValue={currentObligation?.obligation_type?.name} />
            </Card>
          </div>

          <div className='flex-1 flex flex-col'>
            <Title className='mb-4' level={6}>
              Assignment & Progress
            </Title>
            <Card className='flex-1 p-4 md:p-6 gap-4 flex flex-col'>
              <ObligationEditableFieldSelect
                label='Status'
                name='status'
                defaultValue={String(currentObligation.status.id) ?? undefined}
                id={currentObligation.id}
                description={currentObligation.status.description}
                options={statusOptions}
                inlineLabel
              >
                <Badge variant={'outline'}>{currentObligation.status.name}</Badge>
              </ObligationEditableFieldSelect>
              <ObligationEditableFieldSelect
                label='Assigned to'
                name='assigned_to'
                defaultValue={String(currentObligation.assigned_to) ?? undefined}
                id={currentObligation.id}
                options={usersOptions}
                inlineLabel
                className='md:w-52'
              >
                {assignedUserName}
              </ObligationEditableFieldSelect>
              <ObligationEditableFieldDatepicker
                label='Due date'
                name='due_date'
                defaultValue={currentObligation?.due_date ?? undefined}
                id={String(currentObligation.id)}
                placeholder='Pick a due date'
                inlineLabel
              />
              <ObligationEditableFieldDatepicker
                label='Effective date'
                name='effective_date'
                defaultValue={currentObligation?.effective_date ?? undefined}
                id={String(currentObligation.id)}
                placeholder='Pick a effective date'
                inlineLabel
              />
              <FormFieldReadOnly label='Created' defaultValue={dataFormat(currentObligation?.created_at, 'dot')} />
              <FormFieldReadOnly label='Updated' defaultValue={dataFormat(currentObligation?.updated_at, 'dot')} />
              <FormFieldReadOnly label='Last updated by' defaultValue={updatedUserName} />
            </Card>
          </div>
        </div>
        <div className='flex-1 flex flex-col'>
          <Title className='mb-4' level={6}>
            Compliance Summary
          </Title>
          <Card className='p-4 md:p-6 grid md:grid-cols-2 gap-4 bg-muted'>
            <ObligationEditableFieldTextarea
              label='Description'
              defaultValue={String(currentObligation?.description)}
              name='description'
              id={String(currentObligation.id)}
            />
            {regulatoryMetadata &&
              regulatoryMetadata.length > 0 &&
              regulatoryMetadata.map(([key, value]) => (
                <ObligationEditableTextareaRegulatoryMetadata
                  key={`regulatory_metadata.${key}`}
                  label={formatFieldLabel(key)}
                  defaultValue={String(value)}
                  name={`regulatory_metadata.${key}`}
                  id={String(currentObligation.id)}
                />
              ))}
          </Card>
        </div>
      </div>
    </>
  );
}
