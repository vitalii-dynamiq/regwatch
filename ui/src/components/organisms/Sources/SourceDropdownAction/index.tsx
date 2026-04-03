'use client';

import Button from '@/components/atoms/Button';
import NextLink from '@/components/atoms/NextLink';
import { AlertDialog } from '@/components/molecules/AlertDialog';
import Sheet from '@/components/molecules/Sheet';
import SourceDeleteButton from '@/components/organisms/Sources/SourceDeleteButton';
import { SourceUpdateForm } from '@/components/organisms/Sources/SourceFormUpdate';
import { SOURCES_PAGE } from '@/lib/constants/common';
import type { Source } from '@/server/api/entity/source/types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/ui/dropdown-menu';
import { Eye, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';

export default function SourceDropdownAction({ data }: { data: Source | null }) {
  if (!data) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='h-8 w-8 p-0 text-muted-foreground hover:text-foreground'>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='rounded-md border border-border bg-card p-1 shadow-md'>
        <DropdownMenuItem className='p-2 text-sm w-full text-foreground' asChild>
          <NextLink href={`${SOURCES_PAGE}/${data.id}`} className='flex items-center gap-2 w-full font-medium'>
            <Eye className='h-4 w-4' /> View details
          </NextLink>
        </DropdownMenuItem>

        <DropdownMenuItem className='p-2 text-sm w-full text-foreground' asChild>
          <Sheet
            triggerName={
              <div className='flex items-start gap-2 w-full'>
                <Pencil className='h-4 w-4' /> Edit
              </div>
            }
            variant='ghost'
            size='sm'
            title='Edit source'
            stickyFooter
            formId='sourceUpdateForm'
          >
            <SourceUpdateForm data={data} formId='sourceUpdateForm' />
          </Sheet>
        </DropdownMenuItem>

        <DropdownMenuItem className='p-2 text-sm w-full text-foreground' asChild>
          <AlertDialog
            title='Are you sure you want to delete this item?'
            description='If you delete this entity, you will never be able to get it back again.'
            triggerButton={{
              asChild: true,
              variant: 'ghost',
              label: (
                <Button variant='ghost' className='flex justify-start gap-2 w-full !p-2 cursor-pointer'>
                  <Trash2 className='h-4 w-4' /> Delete
                </Button>
              ),
            }}
            actionButton={{
              asChild: true,
              component: <SourceDeleteButton data={data} />,
            }}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
