'use client';

import NextLink from '@/components/atoms/NextLink';
import LinkAsButton from '@/components/molecules/LinkAsButton';
import Modal from '@/components/molecules/Modal';
import type { AppSidebarMenuItemProps } from '@/components/organisms/Apps/AppSidebarMenuItem/types';
import { SidebarMenuButton, SidebarMenuItem } from '@/ui/sidebar';
import * as React from 'react';

export function AppSidebarMenuItem({ item, state }: AppSidebarMenuItemProps) {
  const isDisabled = item.disable;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild tooltip={state === 'collapsed' ? item.title : undefined}>
        {isDisabled ? (
          <Modal
            trigger={
              <SidebarMenuButton className='cursor-pointer'>
                {item.icon && <item.icon className='h-4 w-4' />}
                {state !== 'collapsed' && <span className='text-sm text-sidebar-foreground'>{item.title}</span>}
              </SidebarMenuButton>
            }
            title='Enterprise feature'
          >
            <p className='text-sm text-muted-foreground'>
              This feature is part of our Enterprise plan. Contact our sales team to learn more or request access.
            </p>
            <LinkAsButton
              href={process.env.NEXT_PUBLIC_WEBFLOW_SITE!}
              external
              variant='default'
              className='w-fit ml-auto'
            >
              Talk to sales
            </LinkAsButton>
          </Modal>
        ) : (
          <NextLink href={item.url} className='flex items-center gap-2'>
            {item.icon && <item.icon className='h-4 w-4' />}
            {state !== 'collapsed' && <span className='text-sm text-sidebar-foreground'>{item.title}</span>}
          </NextLink>
        )}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
