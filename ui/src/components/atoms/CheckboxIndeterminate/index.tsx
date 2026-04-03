'use client';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon, MinusIcon } from 'lucide-react';
import * as React from 'react';

import type { CheckboxIndeterminateProps } from '@/components/atoms/CheckboxIndeterminate/types';
import { cn } from '@/lib/utils';

function CheckboxIndeterminate({
  className,
  checked = false,
  onCheckedChange,
  nativeChecked = false,
  ...rest
}: CheckboxIndeterminateProps) {
  // Introduce variable: normalize external boolean into Radix's visual state.
  const visualChecked: boolean | 'indeterminate' = nativeChecked ? true : checked ? 'indeterminate' : false;

  const [checkedState, setCheckedState] = React.useState<boolean | 'indeterminate'>(visualChecked);

  // Keep internal state in sync when external prop changes.
  React.useEffect(() => {
    setCheckedState(visualChecked);
  }, [visualChecked]);

  // Rename + Change signature + Extract variable: make intent and types explicit; normalize Radix input.
  const handleCheckedChange = React.useCallback(
    (nextChecked: boolean | 'indeterminate') => {
      // Extract constant: always promote to true when toggling from indeterminate.
      const isPromotingFromIndeterminate = checkedState === 'indeterminate';
      if (isPromotingFromIndeterminate) {
        setCheckedState(true);
        onCheckedChange?.(true);
        return;
      }

      // Introduce variable: ensure boolean is forwarded to parent, and state mirrors Radix input.
      const normalized: boolean = nextChecked === true;
      setCheckedState(nextChecked);
      onCheckedChange?.(normalized);
    },
    [checkedState, onCheckedChange]
  );

  return (
    <CheckboxPrimitive.Root
      data-slot='checkbox'
      className={cn(
        'cursor-pointer peer border-input dark:bg-input/30 ' +
          'data-[state=checked]:bg-[var(--interactive)] ' +
          'data-[state=checked]:text-primary-foreground ' +
          'dark:data-[state=checked]:bg-primary ' +
          'data-[state=checked]:border-primary ' +
          'data-[state=indeterminate]:bg-[var(--interactive)] ' +
          'data-[state=indeterminate]:text-primary-foreground ' +
          'dark:data-[state=indeterminate]:bg-primary ' +
          'data-[state=indeterminate]:border-primary ' +
          'focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      checked={checkedState}
      onCheckedChange={handleCheckedChange}
      {...rest}
    >
      <CheckboxPrimitive.Indicator
        data-slot='checkbox-indicator'
        className='flex items-center justify-center text-current transition-none bg-[var(--interactive)] dark:bg-primary'
      >
        {checkedState === 'indeterminate' && <MinusIcon className='size-3.5 text-white' />}
        {checkedState === true && <CheckIcon className='size-3.5' />}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { CheckboxIndeterminate };
