import type { ButtonProps } from '@/components/atoms/Button/types';

type Children = string | React.ReactNode;

type TLabel = string | React.ReactNode;
// Extract interfaces for nested properties
interface TriggerButtonProps {
  variant?: ButtonProps['variant']; // Defaults to "outline".
  size?: ButtonProps['size']; // Defaults to "outline".
  label?: TLabel; // Defaults to "Show Alert".
  asChild?: boolean;
  disabled?: boolean;
}

interface ActionButtonProps {
  label?: TLabel; // Defaults to "Confirm".
  asChild?: boolean; // Determines if handled as a child component.
  onClick?: () => void; // Optional callback function.
  component?: Children; // Custom React component to render.
}

export interface AlertDialogProps {
  open?: boolean; // Determines if dialog is open.
  title?: Children; // Optional dialog title.
  description?: Children; // Description for the dialog.
  children?: Children; // Directly use ReactNode.
  showCancelButton?: boolean; // Defaults to true.
  showTriggerButton?: boolean; // Defaults to true.
  triggerButton?: TriggerButtonProps; // Extracted interface for trigger button props.
  actionButton?: ActionButtonProps; // Extracted interface for action button props.
  onOpenChange?: ((open: boolean) => void) | undefined;
}

// Default values for triggerButton and actionButton
export const DEFAULT_TRIGGER_BUTTON: TriggerButtonProps = {
  variant: 'outline' as ButtonProps['variant'],
  label: 'Show Alert',
  size: 'sm' as ButtonProps['size'],
};

export const DEFAULT_ACTION_BUTTON: ActionButtonProps = {
  label: 'Confirm',
  asChild: false,
};

export const DEFAULT_CANCEL_BUTTON: TriggerButtonProps = {
  variant: 'outline' as ButtonProps['variant'],
  label: 'Cancel',
};
