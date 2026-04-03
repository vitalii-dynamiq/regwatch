import { type SearchParamsQuery } from '@/lib/constants/searchParams';
import { normalizeSearchParams } from '@/lib/helpers/normalizeSearchParams';

/**
 * Resolve possibly promised searchParams and normalize them with provided defaults.
 * This helps reduce duplication across server components that accept Next.js searchParams.
 */
export async function resolveNormalizedSearchParams(
  searchParams: Promise<SearchParamsQuery> | undefined,
  defaults: Partial<SearchParamsQuery>
) {
  const resolved = searchParams ? await searchParams : undefined;
  return normalizeSearchParams({
    ...defaults,
    ...(resolved ?? {}),
  });
}
