import type { NextLinkProps } from '@/components/atoms/NextLink/types';
import type { buttonVariants } from '@/ui/button';
import type { VariantProps } from 'class-variance-authority';

export type LinkAsButtonProps = NextLinkProps &
  VariantProps<typeof buttonVariants> & {
    external?: boolean;
  };
