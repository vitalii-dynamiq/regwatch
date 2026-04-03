import { DataTableWithActions } from '@/components/molecules/DataTableWithActions';
import type { DataTableWithActionWrapperProps } from '@/components/templates/DataTableWithActionWrapper/types';
import { cn } from '@/lib/utils';

export function DataTableWithActionWrapper<T>({
  data,
  columns,
  href = '#',
  className = '',
}: DataTableWithActionWrapperProps<T>) {
  return (
    <DataTableWithActions<T>
      data={data}
      columns={columns}
      wrapperClassName={cn('border border-border rounded-lg overflow-hidden bg-card text-card-foreground', className)}
      headerClassName='bg-muted border-b border-border text-sm font-medium text-muted-foreground h-12'
      rowClassName='hover:bg-accent/5 border-b border-border last:border-b-0'
      cellClassName='px-4 py-3 text-sm text-foreground align-middle bg-card !left-0'
      headCellClassName='bg-muted px-4'
      href={href}
    />
  );
}
