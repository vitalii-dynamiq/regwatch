import { getProviders } from 'next-auth/react';

export type Providers = Awaited<ReturnType<typeof getProviders>>;
export type Provider = {
  id: string;
  name: string;
  icon?: React.ReactNode | string | null;
};
export type ProvidersById = Providers;
