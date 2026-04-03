import NextLink from '@/components/atoms/NextLink';
import type { LinkAsButtonProps } from '@/components/molecules/LinkAsButton/types';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/ui/button';
import type { FC } from 'react';

const LinkAsButton: FC<LinkAsButtonProps> = ({
  href,
  className,
  variant,
  size,
  external = false,
  children,
  ...props
}) => {
  const combinedClassName = cn(buttonVariants({ variant, size, className }));

  if (external) {
    return (
      <a href={href} target='_blank' rel='noopener noreferrer' className={combinedClassName} {...props}>
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} className={combinedClassName} {...props}>
      {children}
    </NextLink>
  );
};

export default LinkAsButton;
