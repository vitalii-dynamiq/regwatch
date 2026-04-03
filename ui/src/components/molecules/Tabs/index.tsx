'use client';
import type { Tab, TabsProps } from '@/components/molecules/Tabs/types';
import STATUS from '@/lib/constants/status';
import { buildUrlQueryParams } from '@/lib/helpers/buildUrlQueryParams';
import { cn } from '@/lib/utils';
import { TabsContent, TabsList, TabsTrigger, Tabs as UITabs } from '@/ui/tabs';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

export function Tabs({
  tabs: tabsProp = [],
  defaultTab,
  className,
  listClassName,
  triggerClassName,
  contentClassName,
  orientation = 'horizontal',
  withRouter = false,
  ...rest
}: TabsProps) {
  const tabs = tabsProp;
  if (!tabs.length) return null;

  const router = useRouter();
  const searchParams = useSearchParams();

  // Build a plain object from URLSearchParams for easier manipulation
  const paramsObj = useMemo(() => Object.fromEntries(searchParams), [searchParams]);

  // Remove the controlled status param from the rest we want to preserve
  const restParams = useMemo(
    () => Object.fromEntries(Object.entries(paramsObj).filter(([key]) => key !== STATUS.STATUS_FIELD_IDENTIFIER)),
    [paramsObj]
  );

  // Derive the initial selected tab:
  // - if withRouter is enabled, prefer the value from URL (?status=)
  // - else fall back to provided defaultTab or the first tab id
  const initialSelectedTab = useMemo(() => {
    const statusFromUrl = searchParams.get(STATUS.STATUS_FIELD_IDENTIFIER) || defaultTab;
    if (withRouter && typeof statusFromUrl === 'string' && statusFromUrl.length > 0) {
      return statusFromUrl;
    }
    return defaultTab ?? tabs[0]?.id;
  }, [withRouter, defaultTab, tabs, searchParams]);

  // Centralized URL builder that respects buildUrlQueryParams contract
  const buildHref = useCallback(
    (nextStatus: string): string => {
      return buildUrlQueryParams('', {
        ...restParams,
        [STATUS.STATUS_FIELD_IDENTIFIER]: nextStatus || initialSelectedTab,
      });
    },
    [restParams, initialSelectedTab]
  );

  const handleTabChange = useCallback(
    (value: Tab['id']) => {
      if (!withRouter) return;
      router.push(buildHref(value));
    },
    [withRouter, router, buildHref]
  );

  return (
    <UITabs defaultValue={initialSelectedTab} className={className} onValueChange={handleTabChange} {...rest}>
      <TabsList
        className={cn(orientation === 'vertical' ? 'flex-col' : `grid w-full grid-cols-${tabs.length}`, listClassName)}
      >
        {tabs.map((tab) => (
          <TabsTrigger key={`tab-${tab.id}`} value={tab.id} disabled={tab.disabled} className={triggerClassName}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent
          key={`tab-content-${tab.id}`}
          value={tab.id}
          className={cn('flex flex-col gap-6', contentClassName)}
          asChild
        >
          {tab.content}
        </TabsContent>
      ))}
    </UITabs>
  );
}
