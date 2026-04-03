'use client';

import AppLogo from '@/components/organisms/Apps/AppLogo';
import { SidebarHeader } from '@/ui/sidebar';

export function AppSidebarHeader() {
  return (
    <SidebarHeader className='flex h-(--header-height) justify-center gap-2 p-3 -mb-[1px]'>
      <AppLogo />
    </SidebarHeader>
  );
}
