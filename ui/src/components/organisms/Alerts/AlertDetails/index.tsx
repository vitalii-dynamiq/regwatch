'use client';

import Button from '@/components/atoms/Button';
import NextLink from '@/components/atoms/NextLink';
import Title from '@/components/atoms/Title';
import { BadgeRisk } from '@/components/molecules/BadgeRisk';
import { FormFieldReadOnly } from '@/components/molecules/FormFieldReadOnly';
import Modal from '@/components/molecules/Modal';
import { AlertEditableFieldSelect } from '@/components/organisms/Alerts/AlertEditableFieldSelect';
import { AlertEditableFieldTextareaRegulatoryMetadata } from '@/components/organisms/Alerts/AlertEditableFieldTextareaRegulatoryMetadata';
import ObligationFormAssignee from '@/components/organisms/Obligations/ObligationFormCreateWithAlert';
import { Card } from '@/components/ui/card';
import { dataFormat } from '@/lib/helpers/dataFormat';
import { formatFieldLabel } from '@/lib/helpers/formatFieldLabel';
import { useAlert } from '@/server/api/entity/alert/queries';
import type { Alert } from '@/server/api/entity/alert/types';
import { useAlertAssets } from '@/server/api/entity/alertAssets/queries';
import { useUsersPagination } from '@/server/api/entity/user/queries';
import { Badge } from '@/ui/badge';
import * as React from 'react';

export default function AlertDetails({ alert }: { alert: Alert }) {
  const { data } = useAlert(alert.id);
  const currentAlert = data ?? alert;

  const { data: usersPagination } = useUsersPagination({
    pageSize: 1000,
    orderBy: 'created_at',
  });

  const { data: alertAssets } = useAlertAssets();
  const { statuses } = alertAssets || {};
  const users = usersPagination?.items || [];

  const userMap = React.useMemo(
    () => Object.fromEntries((users ?? []).map((u) => [u.id, `${u.first_name} ${u.last_name}`.trim()])),
    [users]
  );

  const statusOptions =
    statuses?.map((s) => ({
      value: String(s.id),
      textValue: s.name,
    })) ?? [];

  const usersOptions =
    users?.map((j) => ({
      value: String(j.id),
      textValue: `${j.first_name} ${j.last_name}`,
    })) ?? [];

  const assignedUserName = userMap[currentAlert?.assigned_to ?? ''] ?? undefined;

  const regulatoryMetadata = currentAlert?.regulatory_metadata
    ? Object.entries(currentAlert?.regulatory_metadata).filter(
        ([, value]) => value !== null && value !== undefined && value !== ''
      )
    : [];

  return (
    <>
      <div className='flex justify-between items-start'>
        <Title level={3}>{currentAlert.title}</Title>
        <Modal trigger={<Button variant='default'>Create obligation</Button>} title='Create obligation'>
          <ObligationFormAssignee data={currentAlert} />
        </Modal>
      </div>
      <div className='space-y-6 mt-4'>
        <div className='flex flex-col md:flex-row gap-6'>
          <div className='flex-1 flex flex-col'>
            <Title className='mb-4' level={6}>
              Regulatory Details
            </Title>
            <Card className='flex-1 p-4 md:p-6 gap-4 flex flex-col'>
              <FormFieldReadOnly label='Source name' defaultValue={currentAlert.source.name} />
              <FormFieldReadOnly
                label='URL'
                defaultValue={
                  <NextLink href={currentAlert.source.base_url} target='_blank'>
                    {currentAlert.source.base_url}
                  </NextLink>
                }
              />
              <FormFieldReadOnly
                label='Content type'
                defaultValue={currentAlert.content_type.name}
                description={currentAlert.content_type.description}
              />
              {currentAlert.risk_level && (
                <FormFieldReadOnly label='Risk' defaultValue={<BadgeRisk risk={currentAlert.risk_level.name} />} />
              )}
              <FormFieldReadOnly
                label='Alert type'
                defaultValue={currentAlert.alert_type.name}
                description={currentAlert.alert_type.description}
              />
            </Card>
          </div>
          <div className='flex-1 flex flex-col'>
            <Title className='mb-4' level={6}>
              Assignment & Progress
            </Title>
            <Card className='flex-1 p-4 md:p-6 gap-4 flex flex-col'>
              <AlertEditableFieldSelect
                label='Status'
                name='status'
                defaultValue={String(currentAlert.status.id) ?? undefined}
                id={currentAlert.id}
                description={currentAlert.status.description}
                options={statusOptions}
                inlineLabel
              >
                <Badge variant={'outline'}>{currentAlert.status.name}</Badge>
              </AlertEditableFieldSelect>
              <AlertEditableFieldSelect
                label='Assignee'
                name='assigned_to'
                defaultValue={String(currentAlert.assigned_to) ?? undefined}
                id={currentAlert.id}
                options={usersOptions}
                inlineLabel
              >
                {assignedUserName}
              </AlertEditableFieldSelect>
              <FormFieldReadOnly label='Due date' defaultValue={dataFormat(currentAlert.due_date, 'dot')} />
              <FormFieldReadOnly label='Effective date' defaultValue={dataFormat(currentAlert.effective_date, 'dot')} />
              <FormFieldReadOnly label='Detected' defaultValue={dataFormat(currentAlert.detected_at, 'dot')} />
              <FormFieldReadOnly label='Updated' defaultValue={dataFormat(currentAlert.updated_at, 'dot')} />
            </Card>
          </div>
        </div>
        <div className='flex-1 flex flex-col'>
          <Title className='mb-4' level={6}>
            Compliance Summary
          </Title>
          <Card className='p-4 md:p-6 grid md:grid-cols-2 gap-4 bg-muted'>
            <FormFieldReadOnly label='Description' defaultValue={currentAlert.description} valuePosition='below' />
            {regulatoryMetadata &&
              regulatoryMetadata.length > 0 &&
              regulatoryMetadata.map(([key, value]) => (
                <AlertEditableFieldTextareaRegulatoryMetadata
                  key={`regulatory_metadata.${key}`}
                  label={formatFieldLabel(key)}
                  defaultValue={String(value)}
                  name={`regulatory_metadata.${key}`}
                  id={String(currentAlert.id)}
                />
              ))}
          </Card>
        </div>
      </div>
    </>
  );
}
