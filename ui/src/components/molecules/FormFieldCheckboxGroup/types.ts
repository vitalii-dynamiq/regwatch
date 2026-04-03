import type { FormFieldProps } from '@/components/atoms/FormField/types';
import type { SelectOptionProps } from '@/components/atoms/Select/types';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import type { FieldValues } from 'react-hook-form';

type CheckboxGroupOptions = SelectOptionProps & { description?: string | React.ReactNode | undefined };

export type FormFieldCheckboxGroupProps<TFieldValues extends FieldValues = FieldValues> = Omit<
  FormFieldProps<TFieldValues>,
  'renderAction'
> &
  React.ComponentProps<typeof RadioGroupPrimitive.Root> & {
    options?: CheckboxGroupOptions[];
  };
