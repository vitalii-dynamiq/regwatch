import PAGINATION from '@/lib/constants/pagination';
import SearchParams, {
  type QueryValue,
  type SearchParamsKeys,
  type SearchParamsQuery,
} from '@/lib/constants/searchParams';

// Types for clarity and safety when mapping API keys to app key
type ApiToAppKeyMap = Record<SearchParamsKeys & string, SearchParamsKeys>;

// Invert app->api map once (memoized at module scope)
function invertAppToApiMap(mapping: typeof SearchParams): ApiToAppKeyMap {
  return Object.fromEntries(
    Object.entries(mapping).map(([appKey, apiKey]) => [apiKey as SearchParamsKeys, appKey as SearchParamsKeys])
  ) as ApiToAppKeyMap;
}

const apiToAppKeyMap: ApiToAppKeyMap = invertAppToApiMap(SearchParams);

// Small helper to parse positive integers with fallback
function parsePositiveInt(value: unknown, fallback: number): number {
  const n = typeof value === 'string' ? parseInt(value, 10) : Number(value);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

// Normalize search params: map API keys to app keys and coerce numbers
export function normalizeSearchParams(params: Partial<SearchParamsQuery> = {}): Partial<SearchParamsQuery> {
  const filteredParams = Object.entries(params).reduce((acc, [key, value]) => {
    const appKey = apiToAppKeyMap[key as keyof typeof apiToAppKeyMap];
    if (appKey && value !== undefined) {
      acc[appKey] = value as QueryValue;
    }
    return acc;
  }, {} as SearchParamsQuery);

  return {
    ...filteredParams,
    page: parsePositiveInt(filteredParams.page, PAGINATION.DEFAULT_PAGE),
    pageSize: parsePositiveInt(filteredParams.pageSize, PAGINATION.DEFAULT_PAGE_SIZE),
  } as SearchParamsQuery;
}
