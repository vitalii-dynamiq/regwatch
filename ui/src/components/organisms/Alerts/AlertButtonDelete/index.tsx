'use client';

import Button from '@/components/atoms/Button';
import { useDeleteAlert } from '@/server/api/entity/alert/queries';
import type { Alert } from '@/server/api/entity/alert/types';

export default function AlertButtonDelete({ data }: { data: Alert | null }) {
  if (!data) return null;

  const { mutate, isPending } = useDeleteAlert();

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
