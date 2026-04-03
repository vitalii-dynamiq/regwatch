'use client';

import { DialogContent } from '@/components/atoms/Dialog';
import type { ModalProps } from '@/components/molecules/Modal/types';
import { cn } from '@/lib/utils';
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/ui/dialog';
import { type VariantProps, cva } from 'class-variance-authority';

const modalVariants = cva('w-auto', {
  variants: {
    size: {
      default: 'w-full !max-w-[425px]',
      lg: '!max-w-[1000px] md:w-max',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export type ModalSize = VariantProps<typeof modalVariants>['size'];

const Modal = ({ trigger, title, description, children, actions, open, onOpenChange, size }: ModalProps) => {
  const hasHeader = title || description;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className={cn(modalVariants({ size }))}>
        {hasHeader && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}
        {children}
        {actions && <DialogFooter>{actions}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
