'use client';
import NextLink from '@/components/atoms/NextLink';
import type { FormFieldReadOnlyProps } from '@/components/molecules/FormFieldReadOnly/types';
import Tooltip from '@/components/molecules/Tooltip';
import { isEmptyValue } from '@/lib/helpers/isEmptyValue';
import { cn } from '@/lib/utils';
import { ExternalLink, Info } from 'lucide-react';
import type { FieldValues } from 'react-hook-form';

export function FormFieldReadOnly<TFieldValues extends FieldValues>({
  label,
  description,
  defaultValue,
  valuePosition = 'inline',
  href,
  children,
}: FormFieldReadOnlyProps<TFieldValues>) {
  const hasValue = !isEmptyValue(defaultValue);
  const hasHref = !!href;
  const hasDescription = !isEmptyValue(description);
  const isInline = valuePosition === 'inline';
  const isAbove = valuePosition === 'above';
  const isBelow = valuePosition === 'below';
  const valueClass = cn('text-sm text-muted-foreground', !hasValue && 'opacity-20');
  const titleFromDescription = typeof description === 'string' ? description : undefined;

  const ValueText = () => <span className={valueClass}>{hasValue ? defaultValue : 'No data'}</span>;

  return (
    <div className='w-full flex flex-col gap-1'>
      {isAbove && <ValueText />}
      <div className='flex items-center gap-2'>
        {label && <span className='text-sm font-medium w-fit shrink-0'>{label}:</span>}
        {isInline && <ValueText />}
        {hasHref && (
          <NextLink href={href} target='_blank' className='text-muted-foreground pt-0.5' aria-label='Open related link'>
            <ExternalLink className='h-4 w-4' />
          </NextLink>
        )}
        {hasDescription && <Tooltip triggerElement={<Info className='h-4 w-4' />}>{titleFromDescription}</Tooltip>}
        {children}
      </div>
      {isBelow && <ValueText />}
    </div>
  );
}
