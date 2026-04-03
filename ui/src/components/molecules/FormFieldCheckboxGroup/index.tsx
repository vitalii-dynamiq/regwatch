'use client';
import { FormField } from '@/components/atoms/FormField';
import type { FormFieldCheckboxGroupProps } from '@/components/molecules/FormFieldCheckboxGroup/types';
import { Checkbox } from '@/ui/checkbox';
import { FormControl, FormItem, FormLabel } from '@/ui/form';
import * as React from 'react';
import type { FieldValues } from 'react-hook-form';

export function FormFieldCheckboxGroup<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  options = [],
  disabled = false,
}: FormFieldCheckboxGroupProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      description={description}
      renderAction={({ field }) => {
        const idPrefix = `rg-${String(name)}`;

        const value: string[] = Array.isArray(field.value) ? field.value : [];
        const allOptionValues = options.map((o) => o.value as string);
        const isAllSelected = value.length === options.length && options.length > 0;

        const setAll = (checked: boolean) => {
          field.onChange(checked ? allOptionValues : []);
        };

        const toggleOne = (opt: string, checked: boolean) => {
          if (checked) {
            const next = value.includes(opt) ? value : [...value, opt];
            field.onChange(next);
          } else {
            field.onChange(value.filter((v) => v !== opt));
          }
        };

        return (
          <div className='space-y-3'>
            <div className='flex md:items-center md:justify-between flex-col md:flex-row gap-4'>
              <div className='font-semibold text-base'>{label}</div>

              <FormLabel className='flex items-center gap-2 text-sm cursor-pointer' htmlFor={`${idPrefix}-select-all`}>
                <Checkbox
                  id={`${idPrefix}-select-all`}
                  checked={isAllSelected}
                  onCheckedChange={(checked) => setAll(Boolean(checked))}
                  disabled={disabled || options.length === 0}
                  className='cursor-pointer border-primary'
                />
                <span className='text-foreground'>Select all</span>
              </FormLabel>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
              {options.map((option) => {
                const optVal = option.value as string;
                const id = `${idPrefix}-${optVal}`;
                const checked = value.includes(optVal);

                return (
                  <FormItem key={id}>
                    <FormLabel
                      className='flex justify-between items-start gap-2 rounded-lg border border-border p-4 h-full bg-card shadow-sm cursor-pointer'
                      htmlFor={id}
                    >
                      <div>
                        <p className='text-sm font-semibold text-foreground'>{option.textValue}</p>
                        {option.description ? (
                          <p className='text-sm text-muted-foreground mt-1'>{option.description}</p>
                        ) : null}
                      </div>

                      <FormControl>
                        <Checkbox
                          id={id}
                          checked={checked}
                          onCheckedChange={(c) => toggleOne(optVal, Boolean(c))}
                          disabled={disabled}
                          className='border-primary'
                        />
                      </FormControl>
                    </FormLabel>
                  </FormItem>
                );
              })}
            </div>
          </div>
        );
      }}
    />
  );
}
