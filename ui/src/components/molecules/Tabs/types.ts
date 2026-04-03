import type { TabsProps as UITabsProps } from '@radix-ui/react-tabs';

export type Tab = {
  label: string;
  id: string;
  content: string | React.ReactNode;
  disabled?: boolean;
};

export interface TabsProps extends UITabsProps {
  tabs: Tab[];
  orientation?: 'horizontal' | 'vertical';
  defaultTab: string;
  className?: string;
  listClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
  withRouter?: boolean;
}
