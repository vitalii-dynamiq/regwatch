'use client';
import * as React from 'react';

import { FormField } from '@/components/atoms/FormField';
import Textarea from '@/components/atoms/Textarea';
import type { FormFieldTextareaProps } from '@/components/molecules/FormFieldTextarea/types';
import type { FieldValues } from 'react-hook-form';

export function FormFieldTextarea<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
  ...textareaProps
}: FormFieldTextareaProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      label={label}
      description={description}
      renderAction={({ field }) => {
        const { name: fieldName, ...otherFieldAttributers } = field;
        return <Textarea name={fieldName} placeholder={placeholder} {...textareaProps} {...otherFieldAttributers} />;
      }}
    />
  );
}
