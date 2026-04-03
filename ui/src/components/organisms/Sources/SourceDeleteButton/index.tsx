'use client';

import Button from '@/components/atoms/Button';
import { useDeleteSource } from '@/server/api/entity/source/queries';
import type { Source } from '@/server/api/entity/source/types';

export default function SourceDeleteButton({ data }: { data: Source | null }) {
  if (!data) return null;

  const { mutate, isPending } = useDeleteSource();

  const shouldRenderButton = (): boolean => {
    return data !== null;
  };

  const handleDelete = async () => {
    if (!data.id) return;
    mutate(data.id);
  };

  const buttonText = isPending ? 'Deleting...' : 'Delete';

  if (!shouldRenderButton()) return null;

  return (
    <Button onClick={handleDelete} disabled={isPending}>
      {buttonText}
    </Button>
  );
}
