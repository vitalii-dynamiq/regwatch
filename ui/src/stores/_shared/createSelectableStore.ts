import type { Id } from '@/lib/zod';
import type { SelectableState } from '@/stores/_shared/types';
import { create } from 'zustand';

export function createSelectableStore<T extends { id: Id }>() {
  return create<SelectableState<T>>((set) => ({
    selected: [],
    items: [],
    setItem: (item) => {
      set((state) => {
        const nextItems = state.items.filter((o) => o.id !== item.id);
        return { items: [...nextItems, item] };
      });
    },
    setSelected: (item) => {
      set((state) => {
        const nextSelected = state.selected.filter((o) => o.id !== item.id);
        return { selected: [...nextSelected, item] };
      });
    },
    removeSelected: (item) => {
      set((state) => ({
        selected: state.selected.filter((o) => o.id !== item.id),
      }));
    },
    clearItems: () => set({ items: [] }),
    clearAllSelected: () => set({ selected: [] }),
    clearAll: () => set({ selected: [], items: [] }),
  }));
}
