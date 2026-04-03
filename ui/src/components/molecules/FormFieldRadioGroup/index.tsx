'use client';
import { FormField } from '@/components/atoms/FormField';
import type { FormFieldRadioGroupProps } from '@/components/molecules/FormFieldRadioGroup/types';
import { FormControl, FormItem, FormLabel } from '@/ui/form';
import { RadioGroup, RadioGroupItem } from '@/ui/radio-group';
import * as React from 'react';
import type { FieldValues } from 'react-hook-form';

export function FormFieldRadioGroup<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  options = [],
  ...radioGroupProps
}: FormFieldRadioGroupProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      label={label}
      description={description}
      renderAction={({ field }) => {
        const { value, onChange, onBlur } = field;
        const idPrefix = `rg-${String(name)}`;
        return (
          <RadioGroup
            loop
            value={value}
            onValueChange={onChange}
            onBlur={onBlur}
            className='flex flex-col'
            {...radioGroupProps}
          >
            {options.map((option) => {
              const id = `${idPrefix}-${option.value}`;
              return (
                <FormItem key={`${name}-${option.value}`} className='flex items-center gap-3'>
                  <FormControl>
                    <RadioGroupItem value={option.value} id={id} />
                  </FormControl>
                  <FormLabel className='font-normal' htmlFor={id}>
                    {option.textValue}
                  </FormLabel>
                </FormItem>
              );
            })}
          </RadioGroup>
        );
      }}
    />
  );
}
