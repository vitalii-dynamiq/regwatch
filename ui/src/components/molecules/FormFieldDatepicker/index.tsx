import { FormField } from '@/components/atoms/FormField';
import type { FormFieldDatepickerProps } from '@/components/molecules/FormFieldDatepicker/types';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { useState } from 'react';
import type { FieldValues } from 'react-hook-form';

export function FormFieldDatepicker<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  placeholder = 'Pick a date',
  format: dateFormat = 'PPP',
  inlineLabel,
  ...calendarProps
}: FormFieldDatepickerProps<TFieldValues>) {
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      label={label}
      inlineLabel={inlineLabel}
      description={description}
      renderAction={({ field }) => {
        const selectedDate = field.value ? new Date(field.value) : undefined;

        return (
          <div className='relative w-full'>
            <Button
              variant='outline'
              type='button'
              className={cn('w-full justify-start text-left font-normal', !field.value && 'text-muted-foreground')}
              onClick={() => setOpen((prev) => !prev)}
            >
              <CalendarIcon className='mr-2 h-4 w-4 text-muted-foreground' />
              {field.value ? format(selectedDate!, dateFormat) : placeholder}
            </Button>

            {open && (
              <div className='absolute z-50 mt-1 border border-border'>
                <Calendar
                  mode='single'
                  selected={selectedDate}
                  onSelect={(date) => {
                    field.onChange(date?.toISOString() ?? '');
                    setOpen(false);
                  }}
                  {...(calendarProps as Partial<Omit<typeof calendarProps, 'mode' | 'onSelect'>>)}
                />
              </div>
            )}
          </div>
        );
      }}
    />
  );
}
