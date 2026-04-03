'use client';

import { FormFieldCheckboxGroup } from '@/components/molecules/FormFieldCheckboxGroup';
import { FormFieldInput } from '@/components/molecules/FormFieldInput';
import { FormFieldSelect } from '@/components/molecules/FormFieldSelect';
import { FormFieldTextarea } from '@/components/molecules/FormFieldTextarea';
import { emitFormPending } from '@/lib/helpers/formPending';
import { useCreateSource } from '@/server/api/entity/source/queries';
import { type SourceCreateDto, createSourceSchema } from '@/server/api/entity/source/types';
import { useSourceAssets } from '@/server/api/entity/sourceAssets/queries';
import { Form } from '@/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { useForm } from 'react-hook-form';

interface SourceCreateFormProps {
  formId?: string;
}

export function SourceCreateForm({ formId = 'sourceCreateForm' }: SourceCreateFormProps) {
  const form = useForm<SourceCreateDto>({
    resolver: zodResolver(createSourceSchema),
    defaultValues: {
      name: '',
      base_url: '',
      description: '',
      jurisdiction_id: undefined,
      content_types: [],
      monitoring_enabled: true,
      monitoring_frequency: 'daily',
    },
  });

  const { mutate, isPending } = useCreateSource();

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

  const onSubmit = (_values: SourceCreateDto) => {
    mutate({ ..._values });
  };

  return (
    <Form {...form}>
      <form id={formId} onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-start'>
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
            control={form.control}
            options={jurisdictionOptions}
            disabled={isPending}
          />
        </div>

        <FormFieldInput
          name='base_url'
          control={form.control}
          label='Base URL'
          placeholder='https://sec.gov'
          disabled={isPending}
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
