'use client';

import { AppSidebarContent } from '@/components/organisms/Apps/AppSidebarContent';
import { AppSidebarFooter } from '@/components/organisms/Apps/AppSidebarFooter';
import { AppSidebarHeader } from '@/components/organisms/Apps/AppSidebarHeader';
import { OrganizationSwitcher } from '@/components/organisms/Organizations/OrganizationSwitcher';
import { Separator } from '@/ui/separator';
import { Sidebar, SidebarRail } from '@/ui/sidebar';

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <AppSidebarHeader />
      <Separator />
      <OrganizationSwitcher />
      <Separator />
      <AppSidebarContent />
      <SidebarRail />
      <AppSidebarFooter />
    </Sidebar>
  );
}
