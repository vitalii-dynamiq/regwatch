import { AppSingInProviderAuth0 } from '@/components/organisms/Apps/AppSingInProviderAuth0';
import { DASHBOARD_PAGE } from '@/lib/constants/common';
import { verifySession } from '@/lib/dal';
import { redirect } from 'next/navigation';

export default async function Home() {
  const { status, session } = await verifySession();

  if (status === 'authenticated' && session) {
    redirect(DASHBOARD_PAGE);
  }

  return <AppSingInProviderAuth0 />;
}
