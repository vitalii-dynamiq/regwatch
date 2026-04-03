'use client';

import NextLink from '@/components/atoms/NextLink';
import LogoFullImage from '@/components/molecules/LogoFullImage';
import LogoImage from '@/components/molecules/LogoImage';
import { DASHBOARD_PAGE } from '@/lib/constants/common';
import { useSidebar } from '@/ui/sidebar';
import * as React from 'react';

export default function AppLogo() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  return <NextLink href={DASHBOARD_PAGE}>{collapsed ? <LogoImage /> : <LogoFullImage />}</NextLink>;
}
