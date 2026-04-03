import type { TableCellTitleAndLinkProps } from '@/components/molecules/TableCellTitleAndLink/types';
import { cn } from '@/lib/utils';

export function TableCellTitleAndLink({ title, url, titleClassName, urlClassName }: TableCellTitleAndLinkProps) {
  return (
    <>
      {title && (
        <p className={cn('text-sm font-medium text-card-foreground truncate max-w-64 cursor-pointer', titleClassName)}>
          {title}
        </p>
      )}
      {url && (
        <p className={cn('text-sm text-muted-foreground truncate max-w-64 cursor-pointer', urlClassName)}>{url}</p>
      )}
    </>
  );
}
