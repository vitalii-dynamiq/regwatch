import type { FormFieldProps } from '@/components/atoms/FormField/types';
import type { FieldValues } from 'react-hook-form';

export type FormFieldTextareaProps<TFieldValues extends FieldValues = FieldValues> = Omit<
  FormFieldProps<TFieldValues>,
  'renderAction'
> &
  React.ComponentPropsWithoutRef<'textarea'> & {};
