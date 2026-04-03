import TableRowCheckbox from '@/components/molecules/TableRowCheckbox';
import type { ObligationTableRowCheckboxProps } from '@/components/organisms/Obligations/ObligationTableRowCheckbox/types';
import useObligationStore from '@/stores/ObligationsStore';

export default function ObligationTableRowCheckbox({ data }: ObligationTableRowCheckboxProps) {
  if (!data) return null;

  const { setSelected, removeSelected, selected, setItem } = useObligationStore();

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
