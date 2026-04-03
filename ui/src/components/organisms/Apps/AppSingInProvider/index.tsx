'use client';
import Button from '@/components/atoms/Button';
import Auth0Icon from '@/components/icons/Auth0Icon';
import DiscordIcon from '@/components/icons/Discord';
import type { Provider, ProvidersById } from '@/components/organisms/Apps/AppSingInProvider/types';
import { getProviders, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';

const PROVIDER_ICONS: Partial<Record<Provider['id'], Provider['icon']>> = {
  auth0: <Auth0Icon />,
  discord: <DiscordIcon />,
};

const ProviderButton = ({ provider }: { provider: Provider }) => {
  if (!provider.id) return null;
  const icon = PROVIDER_ICONS[provider.id] ?? null;

  return (
    <Button
      key={provider.id}
      type='button'
      onClick={() => signIn(provider.id)}
      variant='outline'
      aria-label={`Sign in with ${provider.name}`}
      asChild
      className='w-full'
    >
      <span>
        {icon} {icon ? ' ' : ''}Sign in with {provider.name}
      </span>
    </Button>
  );
};

const AppSingInProvider = () => {
  const [providersById, setProvidersById] = useState<ProvidersById | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const fetchProviders = async () => {
      try {
        const fetchedProviders = await getProviders();
        if (active) setProvidersById(fetchedProviders);
      } catch {
        if (active) setError('Failed to load sign-in options.');
      } finally {
        if (active) setLoading(false);
      }
    };

    void fetchProviders();
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <div aria-live='polite'>Loading sign-in options…</div>;
  }

  if (error) {
    return (
      <div role='alert' className='text-red-500'>
        {error}
      </div>
    );
  }

  if (!providersById || Object.keys(providersById).length === 0) {
    return null;
  }

  const providers = Object.values(providersById) as Provider[];

  return (
    <>
      {providers.map((provider) => (
        <ProviderButton key={provider.id} provider={provider} />
      ))}
    </>
  );
};

export default AppSingInProvider;
