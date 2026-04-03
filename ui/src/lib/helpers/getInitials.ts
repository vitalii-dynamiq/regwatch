const DEFAULT_FALLBACK = 'NN';

export function getInitials(name?: string): string {
  if (!name) return DEFAULT_FALLBACK;
  const parts = name.trim().split(/\s+/);
  const initials = parts
    .slice(0, 2)
    .map((p) => p.charAt(0).toUpperCase())
    .join('');
  return initials || DEFAULT_FALLBACK;
}
