'use server';

import { auth } from '@/server/auth';
import { isValidToken } from '@/server/auth/isValidToken';

export async function verifySession() {
  const session = await auth();

  const isValid = isValidToken({
    accessToken: session?.accessToken,
    accessTokenExpires: session?.accessTokenExpires,
  });

  const status: 'authenticated' | 'unauthenticated' = isValid ? 'authenticated' : 'unauthenticated';
  return { status, session: isValid ? session : null };
}
