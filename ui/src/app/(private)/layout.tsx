import { AppFooter } from '@/components/organisms/Apps/AppFooter';
import { AppHeader } from '@/components/organisms/Apps/AppHeader';
import { AppSidebar } from '@/components/organisms/Apps/AppSidebar';
import { Breadcrumbs } from '@/components/organisms/Breadcrumbs';
import SessionGuard from '@/components/templates/SessionGuard';
import { SidebarInset, SidebarProvider } from '@/ui/sidebar';
import { Toaster } from '@/ui/sonner';

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionGuard>
      <SidebarProvider defaultOpen={true}>
        <AppSidebar collapsible='icon' />
        <SidebarInset style={{ width: 'calc(100% - var(--sidebar-width))' }}>
          <AppHeader>
            <Breadcrumbs />
          </AppHeader>
          <div className='p-6'>{children}</div>
          <AppFooter />
        </SidebarInset>
      </SidebarProvider>
      <Toaster />
    </SessionGuard>
  );
}
