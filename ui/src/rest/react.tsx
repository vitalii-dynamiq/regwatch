'use client';

import { type QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

import { env } from '@/env';
import { createQueryClient } from '@/rest/query-client';

let clientQueryClientSingleton: QueryClient | undefined = undefined;
const getQueryClient = () => {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return createQueryClient();
  }
  // Browser: use singleton pattern to keep the same query client
  clientQueryClientSingleton ??= createQueryClient();

  return clientQueryClientSingleton;
};

export function RESTReactProvider(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  const [restClient] = useState(() => queryClient);

  return (
    <QueryClientProvider client={restClient}>
      {props.children}
      {env.NEXT_PUBLIC_NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={true} />}
    </QueryClientProvider>
  );
}
