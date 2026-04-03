'use client';

import Button from '@/components/atoms/Button';
import type { FilterDropdownOptionProps } from '@/components/molecules/FilterDropdownOption/types';
import { cn } from '@/lib/utils';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/ui/command';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import * as React from 'react';

export function FilterDropdownOption({
  filter,
  isOpen,
  selected,
  toggleValue,
  handleClear,
  setOpenFilterKey,
}: FilterDropdownOptionProps) {
  return (
    <div className='relative'>
      <Button
        variant='outline'
        size='sm'
        className='w-full justify-between h-10 text-sm font-normal'
        onClick={() => setOpenFilterKey(isOpen ? null : filter.key)}
      >
        {filter.label}
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className='w-4 h-4' />
        </motion.div>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className='absolute left-0 top-full mt-1 w-[250px] border rounded-md bg-white shadow-lg z-50'
          >
            <Command>
              <CommandInput placeholder='Search...' />
              <CommandList>
                <CommandEmpty>No results</CommandEmpty>
                <CommandGroup>
                  {filter.options.map((option) => {
                    const isSelected = selected[filter.key]?.includes(option.value);
                    return (
                      <CommandItem key={option.value} onSelect={() => toggleValue(filter.key, option.value)}>
                        <Check className={cn('mr-2 h-4 w-4', isSelected ? 'opacity-100' : 'opacity-0')} />
                        {option.label}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>

            {selected[filter.key]?.length ? (
              <div className='flex items-center justify-center border-border border-t my-2'>
                <Button
                  variant='ghost'
                  className='mt-1 mx-auto text-sm font-normal hover:underline'
                  onClick={() => handleClear(filter.key)}
                >
                  Clear filters
                </Button>
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
