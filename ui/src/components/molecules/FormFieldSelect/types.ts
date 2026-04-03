import type { FormFieldProps } from '@/components/atoms/FormField/types';
import type { SelectOptionProps, SelectProps } from '@/components/atoms/Select/types';
import type { FieldValues } from 'react-hook-form';

export type FormFieldSelectProps<TFieldValues extends FieldValues = FieldValues> = Omit<
  FormFieldProps<TFieldValues>,
  'renderAction'
> &
  SelectProps & {
    options?: SelectOptionProps[];
  };
