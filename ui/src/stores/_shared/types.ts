import type { Id } from '@/lib/zod';

export type SelectableState<T extends { id: Id }> = {
  selected: T[];
  items: T[];
  setItem: (item: T) => void;
  setSelected: (item: T) => void;
  removeSelected: (item: T) => void;
  clearItems: () => void;
  clearAllSelected: () => void;
  clearAll: () => void;
};
