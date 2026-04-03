import type { FilterConfig } from '@/components/molecules/FilterDropdown/types';

export interface FilterDropdownOptionProps {
  filter: FilterConfig;
  isOpen: boolean;
  selected: Record<string, string>;
  toggleValue: (filterKey: string, value: string) => void;
  handleClear: (filterKey: string) => void;
  setOpenFilterKey: (key: string | null) => void;
}
