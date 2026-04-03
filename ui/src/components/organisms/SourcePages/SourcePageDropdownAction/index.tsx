'use client';

import Button from '@/components/atoms/Button';
import NextLink from '@/components/atoms/NextLink';
import { AlertDialog } from '@/components/molecules/AlertDialog';
import type { Source } from '@/server/api/entity/source/types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/ui/dropdown-menu';
import { Eye, FileMinus, MoreHorizontal } from 'lucide-react';

export default function SourcePagesDropdownAction({ data, pathname }: { data: Source | null; pathname: string }) {
  if (!data) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='h-8 w-8 p-0 text-muted-foreground hover:text-foreground'>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align='end'
        className='rounded-md border border-border bg-card text-card-foreground p-1 shadow-md'
      >
        {/* View Details */}
        <DropdownMenuItem className='p-2 text-sm w-full' asChild>
          <NextLink
            href={`${pathname}/${data.id}`}
            className='flex items-center gap-2 w-full font-medium text-card-foreground hover:text-primary'
          >
            <Eye className='h-4 w-4' /> View details
          </NextLink>
        </DropdownMenuItem>

        {/* Exclude Page */}
        <DropdownMenuItem className='p-2 text-sm w-full' asChild>
          <AlertDialog
            title='Exclude page'
            description='Excluded pages won’t appear in future syncs or monitoring.'
            triggerButton={{
              asChild: true,
              variant: 'ghost',
              label: (
                <Button
                  variant='ghost'
                  className='flex justify-start gap-2 w-full !p-2 cursor-pointer text-card-foreground hover:text-destructive'
                >
                  <FileMinus className='h-4 w-4' /> Exclude
                </Button>
              ),
            }}
            actionButton={{
              asChild: true,
              component: <Button variant='destructive'>Exclude</Button>,
            }}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
