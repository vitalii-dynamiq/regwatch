'use client';
import TableHeadCheckbox from '@/components/molecules/TableHeadCheckbox';
import type { Obligation } from '@/server/api/entity/obligation/types';
import useObligationStore from '@/stores/ObligationsStore';

export default function ObligationTableHeadCheckbox() {
  const { selected, removeSelected, items, setSelected, clearItems } = useObligationStore();
  return (
    <TableHeadCheckbox<Obligation>
      selected={selected}
      removeSelected={removeSelected}
      items={items}
      setSelected={setSelected}
      clearItems={clearItems}
    />
  );
}
