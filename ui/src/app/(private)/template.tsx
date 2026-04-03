'use client';

import { SIGNIN_PAGE } from '@/lib/constants/common';
import { isValidToken } from '@/server/auth/isValidToken';
import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function PrivateTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const isValid = isValidToken({
    accessToken: session?.accessToken,
    accessTokenExpires: session?.accessTokenExpires,
  });

  useEffect(() => {
    if (status === 'unauthenticated' || (status === 'authenticated' && !isValid)) {
      void signOut({
        redirect: true,
        redirectTo: SIGNIN_PAGE,
      });
    }
  }, [status, isValid]);

  return children;
}
