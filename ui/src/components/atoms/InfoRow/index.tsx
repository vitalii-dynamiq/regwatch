import type { InfoRowProps } from '@/components/atoms/InfoRow/types';

export default function InfoRow({ label, value, isLoading }: InfoRowProps) {
  return (
    <div className='grid grid-cols-2 py-4 border-t'>
      <p className='text-sm font-medium'>{label}</p>
      <p className='text-muted-foreground truncate'>{isLoading ? 'Loading...' : value}</p>
    </div>
  );
}
