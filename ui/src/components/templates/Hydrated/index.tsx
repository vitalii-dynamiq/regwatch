import { createHydration } from '@/rest/create-hydration';
import { HydrationBoundary } from '@tanstack/react-query';
import type { ReactNode } from 'react';

interface HydratedProps<T> {
  queryKey: unknown[];
  fetcher: () => Promise<T>;
  children: (data: T | undefined) => ReactNode;
}

export async function Hydrated<T>({ queryKey, fetcher, children }: HydratedProps<T>) {
  const { data, dehydratedState } = await createHydration(queryKey, fetcher);

  return <HydrationBoundary state={dehydratedState}>{children(data)}</HydrationBoundary>;
}
