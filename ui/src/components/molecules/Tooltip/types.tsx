export interface TooltipProps {
  triggerElement: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  asChild?: boolean;
  className?: string;
}
