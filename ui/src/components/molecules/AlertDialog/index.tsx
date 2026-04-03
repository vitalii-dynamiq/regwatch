'use client';

import Button from '@/components/atoms/Button';
import {
  type AlertDialogProps,
  DEFAULT_ACTION_BUTTON,
  DEFAULT_CANCEL_BUTTON,
  DEFAULT_TRIGGER_BUTTON,
} from '@/components/molecules/AlertDialog/types';
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialog as UIAlertDialog,
} from '@/ui/alert-dialog';
import parse from 'html-react-parser';

export function AlertDialog({
  open,
  children,
  description,
  title = 'Alert',
  showCancelButton = true,
  showTriggerButton = true,
  triggerButton = {},
  actionButton = {},
  onOpenChange,
}: AlertDialogProps) {
  // Extract defaults for trigger and action button
  const {
    variant: triggerButtonVariant = DEFAULT_TRIGGER_BUTTON.variant,
    size: triggerButtonSize = DEFAULT_TRIGGER_BUTTON.size,
    label: triggerButtonLabel = DEFAULT_TRIGGER_BUTTON.label,
    disabled: triggerButtonDisabled = false,
    asChild: triggerAsChild = false,
  } = triggerButton;

  const {
    label: actionButtonLabel = DEFAULT_ACTION_BUTTON.label,
    onClick: onActionClick,
    asChild: actionAsChild = false,
    component: actionComponent,
  } = actionButton;

  // Extract cancel button and header for reusability
  const cancelButton = showCancelButton && <AlertDialogCancel>{DEFAULT_CANCEL_BUTTON.label}</AlertDialogCancel>;

  const dialogTriggerButton = showTriggerButton && (
    <AlertDialogTrigger asChild>
      {triggerAsChild ? (
        triggerButtonLabel
      ) : (
        <Button variant={triggerButtonVariant} size={triggerButtonSize} disabled={triggerButtonDisabled}>
          {triggerButtonLabel}
        </Button>
      )}
    </AlertDialogTrigger>
  );

  const header = children ? null : (
    <AlertDialogHeader>
      {title && <AlertDialogTitle>{typeof title === 'string' ? parse(title) : title}</AlertDialogTitle>}
      {description && (
        <AlertDialogDescription>
          {typeof description === 'string' ? parse(description) : description}
        </AlertDialogDescription>
      )}
    </AlertDialogHeader>
  );

  // Render AlertDialog component
  return (
    <UIAlertDialog open={open} onOpenChange={onOpenChange}>
      {dialogTriggerButton}
      <AlertDialogContent>
        {children || (
          <>
            {header}
            <AlertDialogFooter>
              {cancelButton}
              {actionAsChild ? (
                <AlertDialogAction asChild>{actionComponent}</AlertDialogAction>
              ) : (
                <AlertDialogAction onClick={onActionClick}>{actionButtonLabel}</AlertDialogAction>
              )}
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </UIAlertDialog>
  );
}
