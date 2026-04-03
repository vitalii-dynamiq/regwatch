'use client';

import Button from '@/components/atoms/Button';
import { FormFieldSelect } from '@/components/molecules/FormFieldSelect';
import { OBLIGATIONS_PAGE } from '@/lib/constants/common';
import type { Alert } from '@/server/api/entity/alert/types';
import { useCreateObligation } from '@/server/api/entity/obligation/queries';
import { type ObligationCreateDto, createObligationSchema } from '@/server/api/entity/obligation/types';
import { useSourcesPagination } from '@/server/api/entity/source/queries';
import { useUsersPagination } from '@/server/api/entity/user/queries';
import { Form } from '@/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useForm } from 'react-hook-form';

export default function ObligationFormCreateWithAlert({ data }: { data: Alert | null }) {
  if (!data) return null;

  const router = useRouter();

  const form = useForm<ObligationCreateDto>({
    resolver: zodResolver(createObligationSchema),
    defaultValues: {
      source_id: String(data.source.id),
      alert_id: String(data.id),
      title: data.title,
      obligation_type: String(data.alert_type.id),
      content_type: String(data.content_type.id),
      description: data.description,
      risk_level: String(data?.risk_level?.id),
      due_date: data.due_date,
      effective_date: data.effective_date,
      assigned_to: '',
      regulatory_metadata: data.regulatory_metadata,
    },
  });

  const { mutate, isPending } = useCreateObligation();
  const { data: usersPagination } = useUsersPagination({
    pageSize: 1000,
    orderBy: 'created_at',
  });

  const users = usersPagination?.items || [];

  const usersOptions =
    users?.map((j) => ({
      value: String(j.id),
      textValue: `${j.first_name} ${j.last_name}`,
    })) ?? [];

  const onSubmit = (_values: ObligationCreateDto) => {
    mutate(
      { ..._values },
      {
        onSuccess: (data) => {
          router.replace(`${OBLIGATIONS_PAGE}/${data.id}`);
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormFieldSelect
          label='Assignee'
          name='assigned_to'
          control={form.control}
          options={usersOptions}
          disabled={isPending}
        />
        <div className='flex justify-end'>
          <Button type='submit' disabled={isPending}>
            {isPending ? 'Please wait ...' : 'Create'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
