import type { SubtitleProps } from '@/components/atoms/SubTitle/types';
import { cn } from '@/lib/utils';
import * as React from 'react';

export function Subtitle({ children, className, ...props }: SubtitleProps) {
  return (
    <p className={cn('mt-2 mb-4 text-muted-foreground', className)} {...props}>
      {children}
    </p>
  );
}
