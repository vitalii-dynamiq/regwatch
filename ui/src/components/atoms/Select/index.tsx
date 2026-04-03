'use client';
import Input from '@/components/atoms/Input';
import type { SelectOptionProps, SelectProps } from '@/components/atoms/Select/types';
import { cn } from '@/lib/utils';
import { SelectContent, SelectItem, SelectTrigger, SelectValue, Select as UISelect } from '@/ui/select';
import { useMemo } from 'react';

// Extract function: centralizes logic for deriving the selected option's display text.
function getSelectedText(options: SelectOptionProps[], value?: string): string {
  if (!value) return '';
  const match = options.find((option: SelectOptionProps) => option.value === value);
  // Note: textValue is used by the current UI Select API in this codebase.
  return match?.textValue ?? '';
}

// Introduce constant: avoids magic string repetition.
const NO_ITEMS_PLACEHOLDER = 'No items';

export default function Select(props: SelectProps) {
  const { name, placeholder = 'Select', options = [], className, value, ...restProps } = props;

  if (options.length === 0) {
    return <Input placeholder={NO_ITEMS_PLACEHOLDER} id={name} name={name} disabled />;
  }

  // Introduce memoized variable: avoids recomputation on each render for stable options/value.
  const selectedText = useMemo(() => getSelectedText(options, value), [options, value]);

  return (
    <UISelect name={name} value={value} {...restProps}>
      <SelectTrigger className={cn('w-full cursor-pointer', className)}>
        <SelectValue placeholder={placeholder}>
          <span className='block truncate'>{selectedText}</span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {options.map((option: SelectOptionProps) => (
          <SelectItem key={`${name}-${option.value}`} value={option.value} className='cursor-pointer'>
            {option.textValue}
          </SelectItem>
        ))}
      </SelectContent>
    </UISelect>
  );
}
