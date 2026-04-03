'use client';
import NextLink from '@/components/atoms/NextLink';
import { useAlert } from '@/server/api/entity/alert/queries';
import { useObligation } from '@/server/api/entity/obligation/queries';
import { useSource } from '@/server/api/entity/source/queries';
import { Separator } from '@/ui/separator';
import { ChevronRightIcon } from 'lucide-react';
import { useSelectedLayoutSegments } from 'next/navigation';
import React from 'react';

type Breadcrumb = {
  title: string;
  href: string;
};

const isGroupSegment = (s?: string | null) => !!s && s.startsWith('(') && s.endsWith(')');

export function Breadcrumbs() {
  const segments = useSelectedLayoutSegments();
  const visibleSegments = React.useMemo(() => segments.filter((s) => !isGroupSegment(s)), [segments]);

  const [section, id1, id2, id3] = visibleSegments;
  const sourceId = section === 'sources' ? id1 : undefined;
  const obligationId = section === 'obligations' ? id1 : undefined;
  const alertId = section === 'alerts' ? id1 : undefined;

  // Hooks must be called unconditionally and in the same order on every render
  const { data: source } = useSource((sourceId ?? '') as string);
  const { data: obligation } = useObligation((obligationId ?? '') as string);
  const { data: alert } = useAlert((alertId ?? '') as string);

  const buildPath = (depth: number) => `/${visibleSegments.slice(0, depth).join('/')}`;

  const breadcrumbs: Breadcrumb[] = [];

  switch (section) {
    case 'sources': {
      const pageId = id2;
      const nestedAlertId = id3;

      breadcrumbs.push({ title: 'Sources', href: buildPath(1) });

      if (sourceId) {
        breadcrumbs.push({
          title: source?.name ?? '',
          href: buildPath(2),
        });
      }

      if (pageId) {
        breadcrumbs.push({
          title: 'Market Risk Disclosure Requirements 2025',
          href: buildPath(3),
        });
      }

      if (nestedAlertId) {
        breadcrumbs.push({
          title: 'Market Risk Obligation Update',
          href: buildPath(4),
        });
      }
      break;
    }
    case 'obligations': {
      breadcrumbs.push({ title: 'Obligations', href: buildPath(1) });
      if (obligationId) {
        breadcrumbs.push({
          title: obligation?.title ?? '',
          href: buildPath(2),
        });
      }
      break;
    }
    case 'alerts': {
      breadcrumbs.push({ title: 'Alerts', href: buildPath(1) });
      if (alertId) {
        breadcrumbs.push({
          title: alert?.title ?? '',
          href: buildPath(2),
        });
      }
      break;
    }
    default:
      break;
  }

  if (breadcrumbs.length <= 1) return null;

  return (
    <>
      <Separator orientation='vertical' className='!h-4 mr-2 text-border' />
      {breadcrumbs.map((breadcrumb, idx) => {
        const isLast = idx === breadcrumbs.length - 1;
        return (
          <React.Fragment key={breadcrumb.href}>
            {isLast ? (
              <span className='text-sm font-normal text-foreground max-w-1/3 max-h-5 truncate'>{breadcrumb.title}</span>
            ) : (
              <>
                <NextLink href={breadcrumb.href}>
                  <span className='text-sm text-muted-foreground font-normal max-w-1/3 max-h-5 truncate'>
                    {breadcrumb.title}
                  </span>
                </NextLink>
                <ChevronRightIcon className='w-6 h-6 text-muted-foreground shrink-0' />
              </>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
}
