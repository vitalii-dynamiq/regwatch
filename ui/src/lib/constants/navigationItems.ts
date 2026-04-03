import {
  ALERTS_PAGE,
  DASHBOARD_PAGE,
  OBLIGATIONS_PAGE,
  PRIVACY_POLICE_PAGE,
  PROFILE_PAGE,
  SOURCES_PAGE,
  TERMS_OF_SERVICE_PAGE,
} from '@/lib/constants/common';
import {
  CircleUserRound,
  Database,
  FileText,
  Folder,
  LayoutDashboard,
  type LucideIcon,
  Settings,
  TriangleAlert,
  UserRoundPlus,
} from 'lucide-react';

export type NavigationItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
  disable?: boolean;
  target?: '_blank' | '_self' | '_parent' | '_top';
};

export const navigationItems: NavigationItem[] = [
  {
    title: 'Dashboard',
    url: DASHBOARD_PAGE,
    icon: LayoutDashboard,
  },
  {
    title: 'Sources',
    url: SOURCES_PAGE,
    icon: Database,
  },
  {
    title: 'Alerts',
    url: ALERTS_PAGE,
    icon: TriangleAlert,
  },
  {
    title: 'Obligations',
    url: OBLIGATIONS_PAGE,
    icon: FileText,
  },
  {
    title: 'Internal Evidence',
    url: '#',
    icon: Folder,
    disable: true,
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings,
    disable: true,
  },
];

export const userNavigationItems: NavigationItem[] = [
  {
    title: 'Profile',
    url: PROFILE_PAGE,
    icon: CircleUserRound,
  },
  {
    title: 'Invite members',
    url: '#',
    icon: UserRoundPlus,
    disable: true,
  },
];

export const footerNavigationItems: NavigationItem[] = [
  {
    title: 'Privacy Policy',
    url: PRIVACY_POLICE_PAGE,
    target: '_blank',
  },
  {
    title: 'Terms of Service',
    url: TERMS_OF_SERVICE_PAGE,
    target: '_blank',
  },
];
