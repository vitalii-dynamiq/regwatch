import type { NavigationItem } from '@/lib/constants/navigationItems';

// get sidebar context props from src/components/ui/sidebar.tsx
type SidebarContextProps = {
  state: 'expanded' | 'collapsed';
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

export type AppSidebarMenuItemProps = {
  item: NavigationItem;
  state: SidebarContextProps['state'];
};
