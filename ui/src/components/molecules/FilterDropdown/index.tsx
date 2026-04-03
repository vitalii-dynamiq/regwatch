'use client';
import Button from '@/components/atoms/Button';
import type { FilterDropdownProps } from '@/components/molecules/FilterDropdown/types';
import { FilterDropdownOption } from '@/components/molecules/FilterDropdownOption';
import { type SearchParamsQuery } from '@/lib/constants/searchParams';
import { buildSearchParamsQuery } from '@/lib/helpers/buildSearchParamsQuery';
import { buildUrlQueryParams } from '@/lib/helpers/buildUrlQueryParams';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/ui/dropdown-menu';
import { ListFilter, X } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';

type SelectedParams = Record<string, string>;

// Helpers
function parseCsv(csv: string | undefined): string[] {
  return (csv ?? '').split(',').filter(Boolean);
}

function joinCsv(values: string[]): string {
  return values.join(',');
}

// Normalize a url path (e.g., "/alerts?b=2&a=1") to a deterministic string (sorted query)
function normalizeUrl(path: string): string {
  const [pathname, query = ''] = path.split('?');
  const params = new URLSearchParams(query);
  // Sort keys for deterministic comparison
  const sorted = new URLSearchParams();
  Array.from(params.keys())
    .sort()
    .forEach((k) => {
      // keep insertion order of multiple values for same key
      params.getAll(k).forEach((v) => sorted.append(k, v));
    });
  const qs = sorted.toString();
  return qs ? `${pathname}?${qs}` : String(pathname);
}

export function FilterDropdown({ filters, href, className = '' }: FilterDropdownProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getParamsObject = React.useCallback(() => Object.fromEntries(searchParams), [searchParams]);

  const paramsObj = React.useMemo(() => getParamsObject(), [getParamsObject]);

  const buildSearchParamsQueryFrom = React.useCallback((kv: Record<string, string>): SearchParamsQuery => {
    return buildSearchParamsQuery(kv);
  }, []);

  const initialFiltersParams = React.useMemo(
    () =>
      filters
        .filter((f) => f.key in paramsObj)
        .reduce<SelectedParams>((acc, f) => {
          acc[f.key] = paramsObj[f.key] as string;
          return acc;
        }, {}),
    [filters, paramsObj]
  );

  const forwardedParams = React.useMemo(
    () => Object.fromEntries(Object.entries(paramsObj).filter(([key]) => !filters.some((f) => f.key === key))),
    [filters, paramsObj]
  );

  const [selectedParams, setSelectedParams] = React.useState<SelectedParams>(initialFiltersParams);

  // Track what we last pushed to avoid redundant pushes (and effects loops in prod)
  const lastPushedRef = React.useRef<string | null>(null);

  // Keep URL in sync with selected filters and forwarded (non-filter) params.
  React.useEffect(() => {
    const merged = { ...forwardedParams, ...selectedParams };
    const nextQueryObj = buildSearchParamsQueryFrom(merged);
    const nextUrl = buildUrlQueryParams(href, nextQueryObj);

    // Build current URL from live router state
    const currentUrl = normalizeUrl(`${pathname}${searchParams.size ? `?${searchParams.toString()}` : ''}`);
    const normalizedNext = normalizeUrl(nextUrl);

    // Avoid pushing if nothing actually changes or if we already pushed this
    if (normalizedNext !== currentUrl && normalizedNext !== lastPushedRef.current) {
      lastPushedRef.current = normalizedNext;
      router.push(nextUrl);
    }
  }, [
    selectedParams,
    forwardedParams,
    buildSearchParamsQueryFrom,
    href,
    router,
    pathname,
    searchParams, // safe: only size/toString used for compare
  ]);

  const countSelected = React.useCallback(
    (selected: SelectedParams) => Object.values(selected).reduce((acc, csv) => acc + parseCsv(csv).length, 0),
    []
  );

  const totalSelectedCount = React.useMemo(() => countSelected(selectedParams), [countSelected, selectedParams]);

  const toggleValue = React.useCallback(
    (filterKey: string, filterValue: string) => {
      setSelectedParams((prev) => {
        const filterConfig = filters.find((f) => f.key === filterKey);
        if (!filterConfig) return prev;

        const next: SelectedParams = { ...prev };

        if (filterConfig.multiple) {
          const values = parseCsv(prev[filterKey]);
          const hasValue = values.includes(filterValue);
          const nextValues = hasValue ? values.filter((v) => v !== filterValue) : [...values, filterValue];
          if (nextValues.length) {
            next[filterKey] = joinCsv(nextValues);
          } else {
            delete next[filterKey];
          }
        } else {
          next[filterKey] = prev[filterKey] === filterValue ? '' : filterValue;
          if (!next[filterKey]) delete next[filterKey];
        }

        return next;
      });
    },
    [filters]
  );

  const handleClear = React.useCallback((filterKey: string) => {
    setSelectedParams((prev) => {
      const next = { ...prev };
      delete next[filterKey];
      return next;
    });
  }, []);

  const handleClearAll = React.useCallback(() => {
    setSelectedParams({});
  }, []);

  const [openFilterKey, setOpenFilterKey] = React.useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  return (
    <div className='flex items-center gap-2 h-10'>
      <DropdownMenu
        open={dropdownOpen}
        onOpenChange={(open) => {
          setOpenFilterKey(null);
          setDropdownOpen(open);
        }}
      >
        <DropdownMenuTrigger asChild>
          <Button variant='outline' size='sm' className={cn('relative flex items-center gap-2 h-10', className)}>
            <ListFilter className='w-4 h-4' />
            Filter
            {totalSelectedCount > 0 && (
              <span className='flex h-4 w-4 items-center justify-center rounded-full bg-black text-white text-xs'>
                {totalSelectedCount}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56 space-y-2 p-0 overflow-visible' side='bottom' align='start'>
          <div className='p-3 space-y-2'>
            {filters.map((filter) => {
              const isOpen = openFilterKey === filter.key;
              return (
                <FilterDropdownOption
                  key={filter.key}
                  filter={filter}
                  isOpen={isOpen}
                  selected={selectedParams}
                  toggleValue={toggleValue}
                  handleClear={handleClear}
                  setOpenFilterKey={setOpenFilterKey}
                />
              );
            })}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      {totalSelectedCount > 0 && (
        <Button variant='ghost' size='sm' onClick={handleClearAll} className='text-sm h-10 cursor-pointer'>
          <X className='w-4 h-4 mr-1' />
          Reset
        </Button>
      )}
    </div>
  );
}
