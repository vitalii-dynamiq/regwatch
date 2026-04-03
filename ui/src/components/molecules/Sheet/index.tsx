'use client';

import React, { useState } from 'react';

import Button from '@/components/atoms/Button';
import type { SheetProps } from '@/components/molecules/Sheet/types';
import { useFormPending } from '@/hooks/useFormPending';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/ui/button';
import { ScrollArea } from '@/ui/scroll-area';
import { SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, Sheet as UISheet } from '@/ui/sheet';

export default function Sheet({
  triggerName = null,
  title,
  description,
  side = 'right',
  variant = 'default',
  size = 'default',
  open = false,
  children,
  onChange = undefined,
  className,
  stickyFooter = false,
  formId,
  saveText = 'Save',
  cancelText = 'Cancel',
  saveDisabled = false,
  onCancel,
}: SheetProps) {
  const [openEvent, setOpenEvent] = useState<boolean>(open);

  const close = () => setOpenEvent(false);

  const handleTriggerClick = () => setOpenEvent(!openEvent);

  const handleOpenChange = (openState: boolean) => {
    setOpenEvent(openState);
    if (onChange) {
      setTimeout(() => onChange(openState), 500);
    }
  };

  const autoPending = useFormPending(formId);
  const effectiveSaveDisabled = saveDisabled || autoPending;

  const scrollH = stickyFooter ? 'h-[calc(100vh-6rem-72px)]' : 'h-[calc(100vh-6rem)]';

  return (
    <UISheet open={openEvent} onOpenChange={handleOpenChange}>
      {triggerName && (
        <SheetTrigger
          className={cn(buttonVariants({ className, variant, size }), 'cursor-pointer')}
          onClick={handleTriggerClick}
        >
          {triggerName}
        </SheetTrigger>
      )}

      <SheetContent side={side} className='lg:max-w-[600px] flex flex-col p-0'>
        <div className='p-6 pb-4'>
          <SheetHeader className='p-0'>
            <SheetTitle className='text-xl font-bold'>{title}</SheetTitle>
            {description && <SheetDescription>{description}</SheetDescription>}
          </SheetHeader>
        </div>

        <ScrollArea className={cn('px-6 pr-4', scrollH)}>
          <div className='pb-6'>{children}</div>
        </ScrollArea>

        {stickyFooter && (
          <div className='mt-auto border-t border-border bg-background px-6 py-4 sticky bottom-0'>
            <div className='flex items-center justify-end gap-2'>
              <Button
                type='button'
                variant='secondary'
                onClick={() => {
                  onCancel?.();
                  close();
                }}
              >
                {cancelText}
              </Button>

              {formId && (
                <Button type='submit' form={formId} disabled={effectiveSaveDisabled}>
                  {effectiveSaveDisabled ? 'Please wait ...' : saveText}
                </Button>
              )}
            </div>
          </div>
        )}
      </SheetContent>
    </UISheet>
  );
}
