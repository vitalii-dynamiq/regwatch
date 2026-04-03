'use client';

import { FormFieldDatepicker } from '@/components/molecules/FormFieldDatepicker';
import { FormFieldInput } from '@/components/molecules/FormFieldInput';
import { FormFieldSelect } from '@/components/molecules/FormFieldSelect';
import { FormFieldTextarea } from '@/components/molecules/FormFieldTextarea';
import { emitFormPending } from '@/lib/helpers/formPending';
import { usePatchObligation } from '@/server/api/entity/obligation/queries';
import { type Obligation, type ObligationPatchDto, patchObligationSchema } from '@/server/api/entity/obligation/types';
import { useObligationAssets } from '@/server/api/entity/obligationAssets/queries';
import { useSourcesPagination } from '@/server/api/entity/source/queries';
import { useUsersPagination } from '@/server/api/entity/user/queries';
import { Form } from '@/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { useForm } from 'react-hook-form';

interface ObligationUpdateFormProps {
  data: Obligation | null;
  formId?: string;
}

export default function ObligationUpdateForm({ data, formId = 'obligationUpdateForm' }: ObligationUpdateFormProps) {
  if (!data) return null;
  const form = useForm<ObligationPatchDto>({
    resolver: zodResolver(patchObligationSchema),
    defaultValues: {
      title: data.title,
      content_type: String(data.content_type.id),
      description: data.description,
      risk_level: String(data?.risk_level?.id),
      due_date: data.due_date,
      effective_date: data.effective_date,
      assigned_to: String(data.assigned_to),
      regulatory_metadata: data.regulatory_metadata,
      status: String(data?.status?.id),
    },
  });

  const { mutate, isPending } = usePatchObligation(data.id);

  React.useEffect(() => {
    emitFormPending(formId, isPending);
  }, [formId, isPending]);

  const { data: obligationAssets } = useObligationAssets();

  const { data: sourcesPagination } = useSourcesPagination({
    pageSize: 1000,
    orderBy: 'name',
  });
  const { data: usersPagination } = useUsersPagination({
    pageSize: 1000,
    orderBy: 'created_at',
  });

  const users = usersPagination?.items || [];
  const sources = sourcesPagination?.items || [];

  const { risk_levels, obligation_types, statuses } = obligationAssets || {};

  const riskLevelOptions =
    risk_levels?.map((j) => ({
      value: String(j.id),
      textValue: j.name,
    })) ?? [];

  const _obligationTypesOptions =
    obligation_types?.map((j) => ({
      value: String(j.id),
      textValue: j.name,
    })) ?? [];

  const usersOptions =
    users?.map((j) => ({
      value: String(j.id),
      textValue: `${j.first_name} ${j.last_name}`,
    })) ?? [];

  const statusOptions =
    statuses?.map((j) => ({
      value: String(j.id),
      textValue: j.name,
    })) ?? [];

  const selectedSourceId = data?.source?.id;
  const selectedSource = sources.find((s) => s.id === selectedSourceId);
  const contentTypesOptions =
    selectedSource?.content_types?.map((ct) => ({
      value: String(ct.id),
      textValue: ct.name,
    })) ?? [];

  const onSubmit = (_values: ObligationPatchDto) => {
    mutate({ ..._values });
  };

  return (
    <Form {...form}>
      <form id={formId} onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormFieldInput
          name='title'
          control={form.control}
          label='Title'
          placeholder='e.g. Market Risk Reporting'
          disabled={isPending}
        />
        <FormFieldTextarea
          label='Description'
          name='description'
          placeholder='Describe what needs to be done'
          control={form.control}
          disabled={isPending}
        />

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <FormFieldSelect
            label='Risk level'
            name='risk_level'
            control={form.control}
            options={riskLevelOptions}
            disabled={isPending}
          />
          <FormFieldInput label='Source' name='source_id' defaultValue={data.source.name} disabled />
          <FormFieldSelect
            label='Content type'
            name='content_type'
            control={form.control}
            options={contentTypesOptions}
            disabled={isPending || !data?.source?.id}
          />
          <FormFieldDatepicker
            label='Due date'
            name='due_date'
            control={form.control}
            disabled={isPending}
            placeholder='dd.mm.yyyy'
          />
          <FormFieldDatepicker
            label='Effective date'
            name='effective_date'
            control={form.control}
            disabled={isPending}
            placeholder='dd.mm.yyyy'
          />
          <FormFieldSelect
            label='Assignee'
            name='assigned_to'
            control={form.control}
            options={usersOptions}
            disabled={isPending}
          />
          <FormFieldSelect
            label='Status'
            name='status'
            control={form.control}
            options={statusOptions}
            disabled={isPending}
          />
        </div>
      </form>
    </Form>
  );
}
