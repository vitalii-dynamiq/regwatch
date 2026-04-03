import NextLink from '@/components/atoms/NextLink';

export default function TableCellLink({
  href,
  children,
  className,
}: { href: string; children: React.ReactNode; className?: string }) {
  if (!href) return children;
  return (
    <NextLink href={href} className={className}>
      {children}
    </NextLink>
  );
}
