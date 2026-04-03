'use client';
import * as React from 'react';

import { FormField } from '@/components/atoms/FormField';
import type { FormFieldSwitchProps } from '@/components/molecules/FormFieldSwitch/types';
import { cn } from '@/lib/utils';
import { Switch } from '@/ui/switch';
import type { FieldValues } from 'react-hook-form';

export function FormFieldSwitch<TFieldValues extends FieldValues>({
  control,
  name,
  description,
  disabled = false,
  label,
  className,
}: FormFieldSwitchProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      description={description}
      descriptionPosition='above'
      renderAction={({ field }) => (
        <div className='flex items-center gap-2'>
          <Switch
            checked={field.value}
            disabled={disabled}
            onCheckedChange={field.onChange}
            className='cursor-pointer'
          />
          {label && <span className={cn('text-sm text-foreground font-medium', className)}>{label}</span>}
        </div>
      )}
    />
  );
}
