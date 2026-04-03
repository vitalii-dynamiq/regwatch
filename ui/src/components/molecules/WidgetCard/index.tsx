import NextLink from '@/components/atoms/NextLink';
import type { WidgetCardProps } from '@/components/molecules/WidgetCard/types';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { ExternalLink } from 'lucide-react';
import * as React from 'react';
export default function WidgetCard({ children, title, icon: Icon, className, href }: WidgetCardProps) {
  return (
    <Card className='border rounded-lg overflow-hidden flex-1 bg-card flex flex-col p-0 gap-0 shadow-none'>
      <CardHeader className='flex items-center justify-between gap-2 border-b px-4 py-2 [.border-b]:pb-2 text-muted-foreground'>
        <div className='flex items-center gap-1.5'>
          <Icon className='h-4 w-4 text-muted-foreground' />
          <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        </div>
        {href && (
          <NextLink href={href} className='text-sm text-foreground underline flex gap-1'>
            View all <ExternalLink className='h-4 w-4' />
          </NextLink>
        )}
      </CardHeader>
      <CardContent className={cn('p-5 flex flex-col flex-1', className)}>{children}</CardContent>
    </Card>
  );
}
