export type TableHeadCheckboxProps<T> = {
  items: T[];
  selected: T[];
  setSelected: (item: T) => void;
  removeSelected: (item: T) => void;
  clearItems: () => void;
};
