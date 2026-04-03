import type { ModalSize } from '@/components/molecules/Modal/index';
import type { ReactNode } from 'react';

export interface ModalProps {
  trigger?: ReactNode;
  title?: string | ReactNode;
  description?: string | ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
  open?: boolean;
  onOpenChange?: (state: boolean) => void;
  size?: ModalSize;
}
