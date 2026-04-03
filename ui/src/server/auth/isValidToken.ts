type TokenProps = {
  accessToken: string | undefined;
  accessTokenExpires: number | undefined;
};

export function isValidToken(token: TokenProps): boolean {
  if (!token) return false;
  if (!token.accessToken) return false;
  if (!token.accessTokenExpires) return false;

  const LEEWAY_MS = 60 * 1000;
  const now = Date.now();

  const hasValidExpires = Number.isFinite(token.accessTokenExpires);
  const isExpired = !hasValidExpires || now >= token.accessTokenExpires - LEEWAY_MS;
  const hasToken = String(token.accessToken).length > 0;

  return !(!hasToken || isExpired);
}
