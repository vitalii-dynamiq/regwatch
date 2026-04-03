'use client';

import Button from '@/components/atoms/Button';
import NextLink from '@/components/atoms/NextLink';
import { AlertDialog } from '@/components/molecules/AlertDialog';
import AlertButtonDelete from '@/components/organisms/Alerts/AlertButtonDelete';
import { ALERTS_PAGE } from '@/lib/constants/common';
import type { Alert } from '@/server/api/entity/alert/types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/ui/dropdown-menu';
import { Eye, MoreHorizontal, Trash } from 'lucide-react';

export default function AlertDropdownAction({ data }: { data: Alert | null }) {
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
          <NextLink href={`${ALERTS_PAGE}/${data.id}`} className='flex items-center gap-2 w-full font-medium'>
            <Eye className='h-4 w-4' /> View details
          </NextLink>
        </DropdownMenuItem>

        {/*<DropdownMenuItem className='p-2 text-sm w-full text-foreground' asChild>*/}
        {/*  <Modal*/}
        {/*    trigger={*/}
        {/*      <div className='text-sm flex justify-start items-center gap-2 w-full !p-2 cursor-pointer'>*/}
        {/*        <FileText className='h-4 w-4' /> Create obligation*/}
        {/*      </div>*/}
        {/*    }*/}
        {/*    title='Create obligation'*/}
        {/*  >*/}
        {/*    <ObligationFormAssignee data={data} />*/}
        {/*  </Modal>*/}
        {/*</DropdownMenuItem>*/}

        <DropdownMenuItem className='p-2 text-sm w-full text-foreground' asChild>
          <AlertDialog
            title='Are you sure you want to delete this item?'
            description='If you delete this entity, you will never be able to get it back again.'
            triggerButton={{
              asChild: true,
              variant: 'ghost',
              label: (
                <Button variant='ghost' className='flex justify-start gap-2 w-full !p-2 cursor-pointer'>
                  <Trash className='h-4 w-4' /> Delete
                </Button>
              ),
            }}
            actionButton={{
              asChild: true,
              component: <AlertButtonDelete data={data} />,
            }}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
