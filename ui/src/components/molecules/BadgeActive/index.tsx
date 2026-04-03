import type { StatusBadgeProps } from '@/components/molecules/BadgeActive/types';

export function BadgeActive({ active }: StatusBadgeProps) {
  return (
    <div className='inline-flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 h-5'>
      <span className='text-xs font-semibold'>{active ? 'Monitoring Enabled' : 'Monitoring Disabled'}</span>
    </div>
  );
}
