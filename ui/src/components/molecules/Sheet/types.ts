import type { ButtonProps } from '@/components/atoms/Button/types';
import type * as SheetPrimitive from '@radix-ui/react-dialog';
import type React from 'react';

type Params = Record<string, string>;
type SheetSide = 'top' | 'right' | 'bottom' | 'left';

type UISheetProps = React.ComponentPropsWithoutRef<typeof SheetPrimitive.Root>;
type UISheetContentProps = React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> & {
  side?: SheetSide;
};

export interface CommonProps {
  params?: Params;
  children: React.ReactNode;
}

export interface SheetFooterProps {
  stickyFooter?: boolean;
  formId?: string;
  saveText?: string;
  cancelText?: string;
  saveDisabled?: boolean;
  onCancel?: () => void;
  footerClassName?: string;
  contentClassName?: string;
}

export interface SheetProps
  extends CommonProps,
    Pick<UISheetProps, 'open' | 'onOpenChange'>,
    Pick<UISheetContentProps, 'side'>,
    Pick<ButtonProps, 'variant' | 'size' | 'className'>,
    SheetFooterProps {
  triggerName?: React.ReactNode;
  onChange?: (isOpen: boolean) => void;
  title: string;
  description?: string;
}
