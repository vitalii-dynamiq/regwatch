'use client';

import { FormFieldCheckboxGroup } from '@/components/molecules/FormFieldCheckboxGroup';
import { FormFieldInput } from '@/components/molecules/FormFieldInput';
import { FormFieldSelect } from '@/components/molecules/FormFieldSelect';
import { FormFieldSwitch } from '@/components/molecules/FormFieldSwitch';
import { FormFieldTextarea } from '@/components/molecules/FormFieldTextarea';
import { emitFormPending } from '@/lib/helpers/formPending';
import { usePatchSource } from '@/server/api/entity/source/queries';
import { type Source, type SourcePatchDto, patchSourceSchema } from '@/server/api/entity/source/types';
import { useSourceAssets } from '@/server/api/entity/sourceAssets/queries';
import { Form } from '@/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { useForm } from 'react-hook-form';

interface SourceUpdateFormProps {
  data: Source | null;
  formId?: string;
}

export function SourceUpdateForm({ data, formId = 'sourceUpdateForm' }: SourceUpdateFormProps) {
  if (!data) return null;

  const form = useForm<SourcePatchDto>({
    resolver: zodResolver(patchSourceSchema),
    defaultValues: {
      name: data.name,
      description: data.description,
      content_types: data?.content_types?.map((ct) => String(ct.id)) ?? [],
      monitoring_enabled: data.monitoring_enabled,
      monitoring_frequency: String(data.monitoring_frequency.id),
    },
  });

  const { isPending, mutate } = usePatchSource(data.id);

  React.useEffect(() => {
    emitFormPending(formId, isPending);
  }, [formId, isPending]);

  const { data: sourceAssets } = useSourceAssets();
  const { jurisdictions, monitoring_frequency, content_types } = sourceAssets || {};

  const jurisdictionOptions =
    jurisdictions?.map((j) => ({
      value: String(j.id),
      textValue: j.name,
    })) ?? [];

  const monitoringFrequencyOptions =
    monitoring_frequency?.map((j) => ({
      value: String(j.id),
      textValue: j.name,
    })) ?? [];

  const contentTypesOptions =
    content_types?.map((j) => ({
      value: String(j.id),
      textValue: j.name,
      description: j.description,
    })) ?? [];

  const onSubmit = (_values: SourcePatchDto) => {
    mutate({ ..._values });
  };

  return (
    <Form {...form}>
      <form id={formId} onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <FormFieldInput
            name='name'
            control={form.control}
            label='Source name'
            placeholder='Enter source name'
            disabled={isPending}
          />
          <FormFieldSelect
            label='Jurisdiction'
            name='jurisdiction_id'
            options={jurisdictionOptions}
            disabled
            defaultValue={String(data?.jurisdiction?.id)}
          />
        </div>
        <FormFieldInput
          name='base_url'
          label='Base URL'
          placeholder='https://sec.gov'
          disabled
          defaultValue={data.base_url}
        />
        <FormFieldTextarea
          label='Description'
          name='description'
          placeholder='Add source description...'
          control={form.control}
          disabled={isPending}
        />
        <FormFieldCheckboxGroup
          label='Content type'
          name='content_types'
          control={form.control}
          options={contentTypesOptions}
          disabled={isPending}
        />
        <FormFieldSwitch name='monitoring_enabled' control={form.control} disabled={isPending} label='Monitor Source' />
        <FormFieldSelect
          label='Check Frequency'
          name='monitoring_frequency'
          control={form.control}
          options={monitoringFrequencyOptions}
          disabled={isPending}
          className='md:w-1/2'
        />
      </form>
    </Form>
  );
}
