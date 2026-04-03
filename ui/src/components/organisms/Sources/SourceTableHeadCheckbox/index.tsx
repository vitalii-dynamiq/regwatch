'use client';
import TableHeadCheckbox from '@/components/molecules/TableHeadCheckbox';
import type { Source } from '@/server/api/entity/source/types';
import useSourcesStore from '@/stores/SourcesStore';

export default function SourceTableHeadCheckbox() {
  const { selected, removeSelected, items, setSelected, clearItems } = useSourcesStore();

  return (
    <TableHeadCheckbox<Source>
      selected={selected}
      removeSelected={removeSelected}
      items={items}
      setSelected={setSelected}
      clearItems={clearItems}
    />
  );
}
