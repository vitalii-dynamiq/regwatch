'use client';
import { AppSidebarMenuItem } from '@/components/organisms/Apps/AppSidebarMenuItem';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { useMe } from '@/server/api/entity/user/queries';
import { ChevronsUpDown, Plus } from 'lucide-react';
import * as React from 'react';

type Organization = {
  id?: string;
  name: string;
  description?: string | null;
};

export function OrganizationSwitcher() {
  const { isMobile, state } = useSidebar();
  const { data: user, isLoading } = useMe();

  // Use explicit type and null as the empty state for clarity.
  const [selectedOrg, setSelectedOrg] = React.useState<Organization | null>(null);

  // Initialize and sync selected organization from user data.
  React.useEffect(() => {
    if (!user?.organization) return;
    setSelectedOrg(user.organization as Organization);
  }, [user]);

  if (!user?.organization) return null;

  const organizations: Organization[] = [user.organization as Organization]; //todo: temporary fix

  const _handleSelectOrganization = (org: Organization) => {
    setSelectedOrg(org);
  };

  // Render helpers to keep JSX lean.
  const orgName = selectedOrg?.name ?? '';
  const orgDescription = selectedOrg?.description ?? '';

  return (
    <SidebarMenu className='p-2'>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
              disabled={isLoading}
            >
              {state !== 'collapsed' && (
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-medium'>{orgName}</span>
                  <span className='truncate text-xs'>{orgDescription}</span>
                </div>
              )}
              <ChevronsUpDown className='m-auto' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
            align='start'
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className='text-muted-foreground text-xs'>Organizations</DropdownMenuLabel>
            {organizations.map((organization) => (
              <AppSidebarMenuItem
                key={organization.id}
                item={{
                  title: organization.name,
                  url: `#`,
                  disable: true,
                }}
                state={'expanded'}
              />
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className='gap-2 p-2' asChild>
              <AppSidebarMenuItem
                key='add-new-organization'
                item={{
                  title: 'Add organization',
                  url: `#`,
                  icon: Plus,
                  disable: true,
                }}
                state={'expanded'}
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
