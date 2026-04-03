import { buttonVariants } from '@/ui/button';
import type { VariantProps } from 'class-variance-authority';
import * as React from 'react';

export interface ButtonProps extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
