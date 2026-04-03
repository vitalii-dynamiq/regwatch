'use client';
import { CheckboxIndeterminate } from '@/components/atoms/CheckboxIndeterminate';
import type { TableHeadCheckboxProps } from '@/components/molecules/TableHeadCheckbox/types';
import type { Id } from '@/lib/zod';
import { useCallback, useEffect, useMemo, useState } from 'react';

export default function TableHeadCheckbox<T extends { id: Id }>({
  selected,
  removeSelected,
  items,
  setSelected,
  clearItems,
}: TableHeadCheckboxProps<T>) {
  const [pageItems, setPageItems] = useState<T[]>([]);

  useEffect(() => {
    if (items.length > 0) {
      clearItems();
      setPageItems(items);
    }
  }, [items, clearItems]);

  const selectedIds = useMemo(() => new Set(selected.map((s: T) => s.id)), [selected]);

  const selectedCount = useMemo(
    () => pageItems.reduce((acc, item) => (selectedIds.has(item.id) ? acc + 1 : acc), 0),
    [pageItems, selectedIds]
  );
  const isAllSelected = pageItems.length > 0 && selectedCount === pageItems.length;
  const isSomeSelected = selectedCount > 0 && !isAllSelected;

  const handleToggleAllOnPage = useCallback(
    (checked: boolean) => {
      if (checked) {
        if (pageItems.length > 0) {
          pageItems.forEach((item) => {
            if (!selectedIds.has(item.id)) setSelected(item);
          });
        }
        return;
      }
      const selectedPageItems = pageItems.filter((item) => selectedIds.has(item.id));
      selectedPageItems.forEach((item) => removeSelected(item));
    },
    [pageItems, selectedIds, setSelected, removeSelected]
  );

  return (
    <CheckboxIndeterminate
      onCheckedChange={handleToggleAllOnPage}
      checked={isSomeSelected}
      nativeChecked={isAllSelected}
    />
  );
}
