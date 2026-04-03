import { getInitials } from '@/lib/helpers/getInitials';
import { useSession } from 'next-auth/react';

const DEFAULT_NAME = 'No Name';
const DEFAULT_EMAIL = 'No Email';

export function useUserDisplayData() {
  const { data: session } = useSession();
  const user = session?.user;

  const displayName = user?.name?.trim() || DEFAULT_NAME;
  const displayEmail = user?.email?.trim() || DEFAULT_EMAIL;
  const avatarFallback = getInitials(displayName);
  const avatarImageSrc = user?.image || undefined;

  return { displayName, displayEmail, avatarFallback, avatarImageSrc };
}
