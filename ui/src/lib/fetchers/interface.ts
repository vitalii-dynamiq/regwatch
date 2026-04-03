import type { TFetchOptions, TUrl } from '@/lib/fetchers/types';

export interface IFetcher {
  get(url: TUrl, options?: Partial<TFetchOptions>): Promise<unknown>;

  post(url: TUrl, data?: unknown, options?: Partial<TFetchOptions>): Promise<unknown>;

  put(url: TUrl, data: unknown, options?: Partial<TFetchOptions>): Promise<unknown>;

  patch(url: TUrl, data: unknown, options?: Partial<TFetchOptions>): Promise<unknown>;

  delete(url: TUrl, data?: unknown, options?: Partial<TFetchOptions>): Promise<unknown>;

  setCookie(cookieValue: string | undefined): void;

  setBearerAuthorization(token: string | undefined): void;

  setBaseUrl(baseUrl: string): void;
}
