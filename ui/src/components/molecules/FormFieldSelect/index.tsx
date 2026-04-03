'use client';
import * as React from 'react';

import { FormField } from '@/components/atoms/FormField';
import Select from '@/components/atoms/Select';
import type { FormFieldSelectProps } from '@/components/molecules/FormFieldSelect/types';
import type { FieldValues } from 'react-hook-form';

export function FormFieldSelect<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  options = [],
  defaultValue,
  inlineLabel,
  ...selectProps
}: FormFieldSelectProps<TFieldValues>) {
  return (
    <FormField
      inlineLabel={inlineLabel}
      control={control}
      name={name}
      label={label}
      description={description}
      defaultValue={defaultValue}
      renderAction={({ field }) => {
        const { name: fieldName, ...otherFieldAttributes } = field;
        return (
          <Select
            name={fieldName}
            options={options}
            {...selectProps}
            onValueChange={field.onChange}
            {...otherFieldAttributes}
          />
        );
      }}
    />
  );
}
