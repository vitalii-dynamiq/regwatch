'use client';

import Button from '@/components/atoms/Button';
import { useDeleteObligation } from '@/server/api/entity/obligation/queries';
import type { Obligation } from '@/server/api/entity/obligation/types';

export default function ObligationDeleteButton({ data }: { data: Obligation | null }) {
  if (!data) return null;

  const { mutate, isPending } = useDeleteObligation();

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
