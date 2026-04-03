import NextLink from '@/components/atoms/NextLink';
import { footerNavigationItems } from '@/lib/constants/navigationItems';

export function AppFooter() {
  return (
    <footer className='bg-background flex flex-col md:flex-row gap-2 md:gap-6 items-center md:justify-end border-t border-border md:px-6 py-3 mt-auto'>
      {footerNavigationItems.map((item) => (
        <NextLink
          key={item.url}
          href={item.url}
          target={item.target}
          aria-disabled={item.disable}
          className='text-sm text-muted-foreground hover:text-foreground'
        >
          {item.title}
        </NextLink>
      ))}
    </footer>
  );
}
