'use client';
import TableHeadCheckbox from '@/components/molecules/TableHeadCheckbox';
import type { Alert } from '@/server/api/entity/alert/types';
import useAlertsStore from '@/stores/AlertsStore';

export default function AlertTableHeadCheckbox() {
  const { selected, removeSelected, items, setSelected, clearItems } = useAlertsStore();

  return (
    <TableHeadCheckbox<Alert>
      selected={selected}
      removeSelected={removeSelected}
      items={items}
      setSelected={setSelected}
      clearItems={clearItems}
    />
  );
}
