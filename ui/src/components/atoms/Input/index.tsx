import * as React from 'react';

import type { InputProps } from '@/components/atoms/Input/types';
import { cn } from '@/lib/utils';
import { Input as UIInput } from '@/ui/input';
import { forwardRef } from 'react';

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(props, ref) {
  const { name = '', type: inputType = 'text', disabled, className, ...otherProps } = props;
  const combinedClassName = cn(disabled && 'cursor-not-allowed', className);
  return (
    <UIInput
      ref={ref}
      type={inputType}
      name={name}
      aria-disabled={disabled}
      disabled={disabled}
      className={combinedClassName}
      {...otherProps}
    />
  );
});

Input.displayName = 'Input';

export default Input;
