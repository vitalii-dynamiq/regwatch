'use client';

import { DASHBOARD_PAGE } from '@/lib/constants/common';
import { signIn } from 'next-auth/react';
export function AppSingInProviderAuth0() {
  signIn('auth0', { callbackUrl: DASHBOARD_PAGE });
  return null;
}
