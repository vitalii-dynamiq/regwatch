import * as SelectPrimitive from '@radix-ui/react-select';
import * as React from 'react';

export interface SelectOptionProps extends Omit<React.ComponentProps<typeof SelectPrimitive.Item>, 'content'> {
  content?: React.ReactNode;
}

export interface SelectProps extends React.ComponentProps<typeof SelectPrimitive.Root> {
  placeholder?: string;
  options?: SelectOptionProps[];
  defaultValue?: string;
  className?: string;
}
