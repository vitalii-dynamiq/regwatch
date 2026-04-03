import { SidebarTrigger } from '@/ui/sidebar';

export function AppHeader({ children }: { children?: React.ReactNode }) {
  return (
    <header className='flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)'>
      <div className='flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6 truncate'>
        <SidebarTrigger className='-ml-1 cursor-pointer' />
        {children}
        {/* commented due to customer request */}
        {/*<div className='ml-auto flex items-center gap-2'>*/}
        {/*  <Button variant='ghost' size='sm'>*/}
        {/*    <Bell />*/}
        {/*  </Button>*/}
        {/*</div>*/}
      </div>
    </header>
  );
}
