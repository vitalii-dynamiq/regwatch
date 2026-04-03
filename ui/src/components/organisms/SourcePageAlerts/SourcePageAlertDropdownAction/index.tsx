'use client';

import Button from '@/components/atoms/Button';
import { AlertDialog } from '@/components/molecules/AlertDialog';
import type { Source } from '@/server/api/entity/source/types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/ui/dropdown-menu';
import { MoreHorizontal, Trash } from 'lucide-react';

export default function SourcePageAlertsDropdownAction({
  data,
}: {
  data: Source | null;
}) {
  if (!data) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='h-8 w-8 p-0 text-muted-foreground hover:text-foreground'>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end' className='rounded-md border border-border bg-card p-1 shadow-md'>
        {/*TODO: add it when backend will be ready*/}
        {/*<DropdownMenuItem className='p-2 text-sm w-full' asChild>*/}
        {/*  <NextLink*/}
        {/*    href={`${pathname}/${data.id}`}*/}
        {/*    className='flex items-center gap-2 w-full font-medium text-card-foreground hover:text-foreground'*/}
        {/*  >*/}
        {/*    <Eye className='h-4 w-4' /> View details*/}
        {/*  </NextLink>*/}
        {/*</DropdownMenuItem>*/}

        <DropdownMenuItem className='p-2 text-sm w-full' asChild>
          <AlertDialog
            title='Delete'
            description='Deleted alerts won’t appear in future syncs or monitoring.'
            triggerButton={{
              asChild: true,
              variant: 'ghost',
              label: (
                <Button
                  variant='ghost'
                  className='flex justify-start gap-2 w-full !p-2 cursor-pointer text-card-foreground hover:text-foreground'
                >
                  <Trash className='h-4 w-4' /> Delete
                </Button>
              ),
            }}
            actionButton={{
              asChild: true,
              component: <Button variant='destructive'>Delete</Button>,
            }}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
