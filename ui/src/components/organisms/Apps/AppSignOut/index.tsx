'use client';
import { AlertDialog } from '@/components/molecules/AlertDialog';
import { AppSignOutButton } from '@/components/organisms/Apps/AppSignOutButton';
import { SidebarMenuButton } from '@/ui/sidebar';
import { LogOut } from 'lucide-react';

export function AppSignOut() {
  return (
    <AlertDialog
      title='Log out'
      description='You’ll need to sign in again to access your account.'
      triggerButton={{
        asChild: true,
        variant: 'ghost',
        label: (
          <SidebarMenuButton className='cursor-pointer'>
            <LogOut className='size-4' />
            Log out
          </SidebarMenuButton>
        ),
      }}
      actionButton={{
        asChild: true,
        component: <AppSignOutButton />,
      }}
    />
  );
}
