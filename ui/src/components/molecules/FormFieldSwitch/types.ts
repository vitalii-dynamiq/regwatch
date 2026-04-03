import type { FormFieldProps } from '@/components/atoms/FormField/types';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import type { FieldValues } from 'react-hook-form';

export type FormFieldSwitchProps<TFieldValues extends FieldValues = FieldValues> = Omit<
  FormFieldProps<TFieldValues>,
  'renderAction'
> &
  React.ComponentProps<typeof SwitchPrimitive.Root> & {};
