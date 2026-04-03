'use client';

import type { FormFieldProps } from '@/components/atoms/FormField/types';
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage, FormField as UIFormField } from '@/ui/form';
import * as React from 'react';
import type { FieldValues } from 'react-hook-form';

export function FormField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  descriptionPosition = 'below',
  defaultValue,
  renderAction,
  inlineLabel = false,
}: FormFieldProps<TFieldValues>) {
  return (
    <UIFormField
      control={control}
      name={name}
      defaultValue={defaultValue ?? undefined}
      render={({ field }) => {
        const descriptionAbove =
          description && descriptionPosition === 'above' ? <FormDescription>{description}</FormDescription> : null;

        const descriptionBelow =
          description && descriptionPosition === 'below' ? <FormDescription>{description}</FormDescription> : null;

        const controlNode = <FormControl>{renderAction({ field })}</FormControl>;

        return (
          <FormItem>
            {inlineLabel ? (
              <div className='flex gap-2'>
                {label ? <FormLabel className='mb-0 md:shrink-0 md:whitespace-nowrap'>{label}</FormLabel> : null}
                <div className='flex min-w-0 flex-1 flex-col'>
                  {descriptionAbove}
                  {controlNode}
                  {descriptionBelow}
                </div>
              </div>
            ) : (
              <>
                {label ? <FormLabel>{label}</FormLabel> : null}
                {descriptionAbove}
                {controlNode}
                {descriptionBelow}
              </>
            )}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
