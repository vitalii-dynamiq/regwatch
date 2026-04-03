import TableRowCheckbox from '@/components/molecules/TableRowCheckbox';
import type { SourceTableRowCheckboxProps } from '@/components/organisms/Sources/SourceTableRowCheckbox/types';
import useSourcesStore from '@/stores/SourcesStore';

export default function SourceTableRowCheckbox({ data }: SourceTableRowCheckboxProps) {
  if (!data) return null;

  const { setSelected, removeSelected, selected, setItem } = useSourcesStore();

  return (
    <TableRowCheckbox
      data={data}
      addSelected={setSelected}
      selected={selected}
      removeSelected={removeSelected}
      upsertItem={setItem}
    />
  );
}
