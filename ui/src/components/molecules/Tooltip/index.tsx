import type { TooltipProps } from '@/components/molecules/Tooltip/types';
import { cn } from '@/lib/utils';
import { TooltipContent, TooltipTrigger, Tooltip as UITooltip } from '@/ui/tooltip';

export default function Tooltip({ triggerElement, children, side = 'top', asChild = false, className }: TooltipProps) {
  return (
    <UITooltip>
      <TooltipTrigger asChild={asChild} className={cn('truncate max-w-64 cursor-help', className)}>
        {triggerElement}
      </TooltipTrigger>
      <TooltipContent side={side} className='max-w-52 whitespace-pre-wrap break-words'>
        {children}
      </TooltipContent>
    </UITooltip>
  );
}
