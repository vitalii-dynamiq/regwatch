'use client';

import { AppSidebarUserNavigation } from '@/components/organisms/Apps/AppSidebarUserNavigation';
import { SidebarFooter } from '@/ui/sidebar';

export function AppSidebarFooter() {
  return (
    <SidebarFooter>
      <AppSidebarUserNavigation />
    </SidebarFooter>
  );
}
