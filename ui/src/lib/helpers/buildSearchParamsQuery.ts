import SearchParams, { type SearchParamsQuery } from '@/lib/constants/searchParams';

const mapApiParamToKey = (apiParam: string) => {
  return Object.entries(SearchParams).find(([_key, val]) => val === apiParam)?.[0] as keyof typeof SearchParams;
};

export function buildSearchParamsQuery(kv: Record<string, string>): SearchParamsQuery {
  return Object.fromEntries(
    Object.entries(kv)
      .filter(([rawKey]) => !!mapApiParamToKey(rawKey))
      .map(([rawKey, value]) => {
        const key = mapApiParamToKey(rawKey);
        return [key, value];
      })
  );
}
