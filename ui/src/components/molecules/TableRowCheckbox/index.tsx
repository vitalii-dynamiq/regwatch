import Checkbox from '@/components/atoms/Checkbox';
import type { TableRowCheckboxProps } from '@/components/molecules/TableRowCheckbox/types';
import type { Id } from '@/lib/zod';
import { useCallback, useEffect } from 'react';

export default function TableRowCheckbox<T extends { id: Id }>({
  data,
  addSelected,
  removeSelected,
  selected,
  upsertItem,
  ...rest
}: TableRowCheckboxProps<T>) {
  if (!data) return null;

  const isChecked = selected.some((item) => item.id === data.id);

  useEffect(() => {
    upsertItem(data);
  }, [data, upsertItem]);

  const handleCheckedChange = useCallback(
    (checked: boolean) => {
      if (checked) {
        addSelected(data);
      } else {
        removeSelected(data);
      }
    },
    [addSelected, removeSelected, data]
  );

  return <Checkbox checked={isChecked} onCheckedChange={handleCheckedChange} {...rest} />;
}
