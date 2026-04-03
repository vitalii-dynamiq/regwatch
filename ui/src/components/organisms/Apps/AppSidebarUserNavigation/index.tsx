'use client';

import { AppSidebarMenuItem } from '@/components/organisms/Apps/AppSidebarMenuItem';
import { AppSidebarUserNavigationInfo } from '@/components/organisms/Apps/AppSidebarUserNavigationInfo';
import { AppSignOut } from '@/components/organisms/Apps/AppSignOut';
import { userNavigationItems } from '@/lib/constants/navigationItems';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/ui/sidebar';
import { EllipsisVertical } from 'lucide-react';

export function AppSidebarUserNavigation() {
  const { isMobile, state } = useSidebar();
  const collapsed = state === 'collapsed';

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className={cn(
                'data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer',
                collapsed && 'justify-center'
              )}
              tooltip={collapsed ? 'User menu' : undefined}
            >
              <AppSidebarUserNavigationInfo collapsed={collapsed} />
              <EllipsisVertical className={cn('ml-auto size-4', collapsed && 'ml-0')} />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                <AppSidebarUserNavigationInfo collapsed={false} />
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <SidebarMenu>
                {userNavigationItems.map((item) => {
                  return <AppSidebarMenuItem key={item.title} item={item} state={'expanded'} />;
                })}
              </SidebarMenu>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <AppSignOut />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
