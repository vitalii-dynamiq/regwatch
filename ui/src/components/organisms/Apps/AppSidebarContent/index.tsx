'use client';

import { AppSidebarMenuItem } from '@/components/organisms/Apps/AppSidebarMenuItem';
import { navigationItems } from '@/lib/constants/navigationItems';
import { Sidebar, SidebarContent, SidebarGroup, SidebarMenu, useSidebar } from '@/ui/sidebar';
import * as React from 'react';

export function AppSidebarContent(_props: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarMenu>
          {navigationItems.map((item) => {
            return <AppSidebarMenuItem key={item.title} item={item} state={state} />;
          })}
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  );
}
