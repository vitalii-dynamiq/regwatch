/**
 * Resolve possibly promised route params and normalize them by trimming string values.
 * Preserves the expected param types via generics so callers get strong typing.
 */
export async function resolveNormalizedParams<T extends Record<string, string | number | undefined>>(
  params: Promise<T> | undefined
): Promise<Partial<T>> {
  const resolved = params ? await params : undefined;

  if (!resolved) return {} as Partial<T>;

  const normalized = Object.fromEntries(
    Object.entries(resolved).map(([key, value]) => [key, typeof value === 'string' ? value.trim() : value])
  ) as T;

  return normalized;
}
