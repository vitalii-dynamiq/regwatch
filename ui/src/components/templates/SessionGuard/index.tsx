'use server';

import { SIGNIN_PAGE } from '@/lib/constants/common';
import { verifySession } from '@/lib/dal';
import { isValidToken } from '@/server/auth/isValidToken';
import { SessionProvider } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default async function SessionGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session } = await verifySession();
  const isValid = isValidToken({
    accessToken: session?.accessToken,
    accessTokenExpires: session?.accessTokenExpires,
  });
  if (!session || !isValid) {
    redirect(SIGNIN_PAGE);
  }
  const refetchInterval = 300; //seconds - 300 seconds = 5 minutes
  return (
    <SessionProvider refetchOnWindowFocus={true} refetchInterval={refetchInterval}>
      {children}
    </SessionProvider>
  );
}
