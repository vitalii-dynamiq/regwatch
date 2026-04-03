import TableRowCheckbox from '@/components/molecules/TableRowCheckbox';

import type { AlertTableRowCheckboxProps } from '@/components/organisms/Alerts/AlertTableRowCheckbox/types';
import useAlertsStore from '@/stores/AlertsStore';

export default function AlertTableRowCheckbox({ data }: AlertTableRowCheckboxProps) {
  if (!data) return null;

  const { setSelected, removeSelected, selected, setItem } = useAlertsStore();

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
