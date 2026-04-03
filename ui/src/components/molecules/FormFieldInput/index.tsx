'use client';
import * as React from 'react';

import { FormField } from '@/components/atoms/FormField';
import Input from '@/components/atoms/Input';
import type { FormFieldInputProps } from '@/components/molecules/FormFieldInput/types';
import type { FieldValues } from 'react-hook-form';

export function FormFieldInput<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
  ...inputProps
}: FormFieldInputProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      label={label}
      name={name}
      description={description}
      renderAction={({ field }) => {
        const { name: fieldName, ...otherFieldAttributers } = field;
        return <Input name={fieldName} placeholder={placeholder} {...inputProps} {...otherFieldAttributers} />;
      }}
    />
  );
}
