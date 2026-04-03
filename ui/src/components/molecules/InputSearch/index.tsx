'use client';
import { FormFieldInput } from '@/components/molecules/FormFieldInput';
import type { SearchInputProps } from '@/components/molecules/InputSearch/types';
import { type SearchParamsKeys, type SearchParamsQuery } from '@/lib/constants/searchParams';
import { buildUrlQueryParams } from '@/lib/helpers/buildUrlQueryParams';
import { cn } from '@/lib/utils';
import { type Search as TSearch, searchSchema } from '@/lib/zod/';
import { Form } from '@/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Search, X } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { useForm } from 'react-hook-form';

export function InputSearch({
  paramKey = 'search',
  placeholder = 'Search...',
  debounceMs = 200,
  className,
}: SearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const paramsObj = React.useMemo(() => Object.fromEntries(searchParams), [searchParams]);
  const initialValue = (paramsObj[paramKey] as string | undefined) ?? '';

  const restParams = React.useMemo(
    () => Object.fromEntries(Object.entries(paramsObj).filter(([key]) => key !== paramKey)),
    [paramKey, paramsObj]
  );

  const form = useForm<TSearch>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      [paramKey]: initialValue,
    },
  });

  // Rename for intent
  const searchValue = form.watch(paramKey) as string;

  // Rename and simplify navigation
  const replaceUrl = React.useCallback(
    (url: string) => {
      if (!url) return router.replace(pathname);
      return router.replace(url);
    },
    [router, pathname]
  );

  // Extract URL building to a single place
  const buildNextUrl = React.useCallback(
    (search: string) => {
      const isEmpty = search === '';
      return isEmpty
        ? buildUrlQueryParams('', { ...restParams })
        : buildUrlQueryParams('', { ...restParams, [paramKey]: search });
    },
    [paramKey, restParams]
  );

  // Stable submit handler
  const onSubmit = React.useCallback(
    (values: SearchParamsQuery) => {
      if (!values) return;
      const key = paramKey as SearchParamsKeys;
      const raw = values[key];
      const search = typeof raw === 'string' ? raw : '';
      const url = buildNextUrl(search);
      replaceUrl(url);
    },
    [paramKey, buildNextUrl, replaceUrl]
  );

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      form.handleSubmit(onSubmit)();
      return searchValue;
    }, debounceMs);
    return () => clearTimeout(timeout);
  }, [searchValue, debounceMs, form, onSubmit]);

  const handleClear = React.useCallback(() => {
    form.setValue(paramKey, '');
  }, [form, paramKey]);

  return (
    <div className={cn('relative w-full md:w-80', className)}>
      <Form {...form}>
        <form>
          <Search className='absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <FormFieldInput name={paramKey} control={form.control} placeholder={placeholder} className='pl-8 pr-8 h-10' />
          {searchValue && (
            <button
              type='button'
              onClick={handleClear}
              className='absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer'
              aria-label='Clear search'
            >
              <X className='h-4 w-4' />
            </button>
          )}
        </form>
      </Form>
    </div>
  );
}
