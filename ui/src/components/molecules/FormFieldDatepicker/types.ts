import type { FormFieldProps } from '@/components/atoms/FormField/types';
import { Calendar } from '@/components/ui/calendar';
import type { ComponentProps } from 'react';
import type { FieldValues } from 'react-hook-form';

export type FormFieldDatepickerProps<TFieldValues extends FieldValues = FieldValues> = Omit<
  FormFieldProps<TFieldValues>,
  'renderAction'
> &
  Omit<ComponentProps<typeof Calendar>, 'selected' | 'onSelect'> & {
    placeholder?: string;
    format?: string;
  };
