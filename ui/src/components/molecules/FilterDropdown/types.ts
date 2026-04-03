interface FilterOption {
  label: string;
  value: string;
}

export interface FilterConfig {
  key: string;
  label: string;
  options: FilterOption[];
  multiple?: boolean;
  show?: boolean;
}

export interface FilterDropdownProps {
  filters: FilterConfig[];
  className?: string;
  href: string;
}
