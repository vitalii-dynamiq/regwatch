import PaginationLink from '@/components/atoms/PaginationLink';
import { cn } from '@/lib/utils';
import { ChevronLeftIcon } from 'lucide-react';

export default function PaginationPrevious({ className, href, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label='Go to previous page'
      size='default'
      className={cn('gap-1 px-2.5 sm:pl-2.5', className)}
      href={href}
      {...props}
    >
      <ChevronLeftIcon />
      <span className='hidden sm:block'>Previous</span>
    </PaginationLink>
  );
}
