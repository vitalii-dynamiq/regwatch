export type TableRowCheckboxProps<T> = {
  data: T | null;
  selected: T[];
  addSelected: (item: T) => void;
  removeSelected: (item: T) => void;
  upsertItem: (item: T) => void;
};
