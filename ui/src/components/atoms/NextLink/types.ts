import type { ReactNode } from 'react';

export interface NextLinkProps extends React.ComponentProps<'a'> {
  href: string;
  children: string | ReactNode;
  className?: string;
}
