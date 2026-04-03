import type { FormFieldProps } from '@/components/atoms/FormField/types';
import type { NextLinkProps } from '@/components/atoms/NextLink/types';
import type { FieldValues } from 'react-hook-form';

export type FormFieldReadOnlyProps<TFieldValues extends FieldValues = FieldValues> = Omit<
  FormFieldProps<TFieldValues>,
  'renderAction' | 'name' | 'error' | 'required' | 'disabled' | 'readOnly'
> & {
  href?: NextLinkProps['href'];
  valuePosition?: 'above' | 'below' | 'inline';
  children?: React.ReactNode;
};
