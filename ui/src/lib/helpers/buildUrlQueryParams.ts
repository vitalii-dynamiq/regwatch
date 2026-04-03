import SearchParams, { type QueryValue, type SearchParamsQuery } from '@/lib/constants/searchParams';

function isValueSet(v: unknown): v is string | number | (string | number)[] {
  if (Array.isArray(v)) return v.some((i) => i !== undefined && i !== null && i !== '');
  return v !== undefined && v !== null && v !== '';
}

function setParam(params: URLSearchParams, key: string, value: QueryValue | undefined | null): void {
  if (!isValueSet(value)) return;
  if (Array.isArray(value)) {
    // Replace existing values for the key using append to preserve multi-valued semantics
    params.delete(key);
    value.forEach((v) => {
      if (v !== undefined && v !== null && v !== '') params.append(key, String(v));
    });
    return;
  }
  params.set(key, String(value));
}

export function buildUrlQueryParams(baseHref = '', searchParams: SearchParamsQuery): string {
  const params = new URLSearchParams();

  (Object.keys(SearchParams) as Array<keyof typeof SearchParams>).forEach((k) => {
    const apiKey = SearchParams[k]; // string
    const value = searchParams[k]; // QueryValue | undefined
    setParam(params, apiKey, value);
  });

  const sortedParams = new URLSearchParams(Array.from(params.entries()).sort((a, b) => a[0].localeCompare(b[0])));
  const queryString = sortedParams.toString();
  return queryString ? `${baseHref}?${queryString}` : baseHref;
}
