import NextLink from '@/components/atoms/NextLink';
import type { PaginationLinkProps } from '@/components/atoms/PaginationLink/types';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/ui/button';

export default function PaginationLink({
  href,
  children,
  className,
  isActive: active = false,
  size = 'icon',
  ...props
}: PaginationLinkProps) {
  if (!href) return null;
  // Extract constant for clarity and to avoid inline conditional noise
  const variant = active ? 'outline' : 'ghost';

  return (
    <NextLink
      href={href}
      data-slot='pagination-link'
      data-active={active}
      aria-current={active ? 'page' : undefined}
      className={cn(
        buttonVariants({
          variant,
          size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </NextLink>
  );
}
