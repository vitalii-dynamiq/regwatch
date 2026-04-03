import { createQueryClient } from '@/rest/query-client';
import { dehydrate } from '@tanstack/react-query';

export async function createHydration<T>(queryKey: unknown[], fetcher: () => Promise<T>) {
  const queryClient = createQueryClient();

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: fetcher,
  });

  const data = queryClient.getQueryData<T>(queryKey);

  return {
    data,
    queryClient,
    dehydratedState: dehydrate(queryClient),
  };
}
