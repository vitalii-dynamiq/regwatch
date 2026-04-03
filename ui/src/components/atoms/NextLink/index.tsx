import type { NextLinkProps } from '@/components/atoms/NextLink/types';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import type { FC } from 'react';

const NextLink: FC<NextLinkProps> = ({ children, href, ...props }) => {
  const { className = '', ...otherProps } = props;
  const combinedClassName = cn(className, 'cursor-pointer');
  return (
    <Link href={href} className={combinedClassName} {...otherProps}>
      {children}
    </Link>
  );
};

export default NextLink;
