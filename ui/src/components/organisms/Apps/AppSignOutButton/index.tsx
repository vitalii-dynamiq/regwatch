'use client';
import { SIGNIN_PAGE } from '@/lib/constants/common';
import { signOut } from 'next-auth/react';

import Button from '@/components/atoms/Button';

export function AppSignOutButton() {
  return (
    <Button onClick={() => signOut({ redirectTo: SIGNIN_PAGE })} variant='destructive'>
      Log out
    </Button>
  );
}
