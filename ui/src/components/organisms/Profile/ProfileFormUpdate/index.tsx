'use client';

import Button from '@/components/atoms/Button';
import { FormFieldInput } from '@/components/molecules/FormFieldInput';
import { useMe, usePatchMe } from '@/server/api/entity/user/queries';
import { type UserPatchDto, patchUserSchema } from '@/server/api/entity/user/types';
import { Form } from '@/ui/form';
import { Separator } from '@/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { useForm } from 'react-hook-form';

export function ProfileFormUpdate() {
  const { data: me, isLoading } = useMe();

  const form = useForm<UserPatchDto>({
    resolver: zodResolver(patchUserSchema),
    defaultValues: {
      first_name: me?.first_name || '',
      last_name: me?.last_name || '',
    },
  });

  const { mutate, isPending } = usePatchMe();

  const onSubmit = (_values: UserPatchDto) => {
    mutate({ ..._values });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormFieldInput
          name='first_name'
          control={form.control}
          label='First name'
          placeholder='Enter your first name'
          disabled={isPending}
        />
        <FormFieldInput
          name='last_name'
          control={form.control}
          label='Last name'
          placeholder='Enter your last name'
          disabled={isPending}
        />
        <FormFieldInput
          name='email'
          label='Email'
          placeholder='Enter your last name'
          disabled={isPending}
          readOnly={true}
          defaultValue={String(me?.email)}
        />
        <Separator />
        <div className='flex justify-end'>
          <Button type='submit' disabled={isPending}>
            {isPending ? 'Please wait ...' : 'Save'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
