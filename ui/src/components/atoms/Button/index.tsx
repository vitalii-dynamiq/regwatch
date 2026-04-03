import type { ButtonProps } from '@/components/atoms/Button/types';
import { cn } from '@/lib/utils';
import { Button as UIButton } from '@/ui/button';
import type { ReactNode } from 'react';

export default function Button(props: ButtonProps): ReactNode {
  const { className = '', disabled, ...otherProps } = props;
  const combinedClassName = cn(disabled ? 'cursor-not-allowed' : 'cursor-pointer', className);
  return <UIButton className={combinedClassName} aria-disabled={disabled} disabled={disabled} {...otherProps} />;
}
