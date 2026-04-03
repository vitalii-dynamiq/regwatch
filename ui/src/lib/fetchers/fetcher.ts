import { env } from '@/env';
import type { IFetcher } from '@/lib/fetchers/interface';
import type { TFetchOptions, THeaders, TUrl } from '@/lib/fetchers/types';
import getBackendUrl from '@/lib/getBackendUrl';

export default class Fetcher implements IFetcher {
  protected baseUrl: string | undefined;
  protected fetchHeaders: THeaders;
  protected responseHeaders: Headers | undefined;
  protected referrerPolicy: RequestInit['referrerPolicy'];

  constructor() {
    this.baseUrl = getBackendUrl();
    this.fetchHeaders = this.buildDefaultHeaders();
    const envPolicy = env.NEXT_PUBLIC_REFERRER_POLICY as RequestInit['referrerPolicy'] | undefined;
    this.referrerPolicy = envPolicy ?? 'no-referrer';
  }

  private buildDefaultHeaders(): THeaders {
    return {
      'Content-Type': 'application/json',
      // It's fine to advertise JSON; Accept is optional but can be useful.
      Accept: 'application/json',
    };
  }

  setCookie(_cookieValue: string | undefined): void {
    // no-op placeholder; implement if cookie forwarding is required
  }

  setBaseUrl(baseUrl: string): void {
    this.baseUrl = baseUrl;
  }

  setBearerAuthorization(token: string | undefined): void {
    if (token) {
      this.fetchHeaders['Authorization'] = `Bearer ${token}`;
    }
  }

  setHeaders(headers: THeaders): void {
    this.fetchHeaders = {
      ...this.fetchHeaders,
      ...headers,
    };
  }

  getResponseHeaders(): Headers | undefined {
    return this.responseHeaders;
  }

  async get(url: TUrl, options?: Partial<TFetchOptions>) {
    return this.request('GET', url, undefined, { ...options, cache: 'force-cache' }); // todo: 'force-cache' for experimental purposes
  }

  async post(url: TUrl, data?: unknown, options?: Partial<TFetchOptions>) {
    return this.request('POST', url, data, options);
  }

  async put(url: TUrl, data?: unknown, options?: Partial<TFetchOptions>) {
    return this.request('PUT', url, data, options);
  }

  async patch(url: TUrl, data?: unknown, options?: Partial<TFetchOptions>) {
    return this.request('PATCH', url, data, options);
  }

  async delete(url: TUrl, data?: unknown, options?: Partial<TFetchOptions>) {
    return this.request('DELETE', url, data, options);
  }

  // Upload helpers preserved for convenience
  async file(url: TUrl, formData: FormData) {
    // Do not set Content-Type for FormData; browser will set multipart boundary
    const headers = { ...this.fetchHeaders };
    delete (headers as Record<string, unknown>)['Content-Type'];
    return this.request('POST', url, formData, { headers });
  }

  async putFile(url: TUrl, blob: Blob) {
    // Set appropriate content type for raw binary payloads
    const headers: THeaders = { ...this.fetchHeaders, 'Content-Type': 'application/octet-stream' };
    return this.request('PUT', url, blob, { headers });
  }

  private async request(method: string, url: TUrl, data?: unknown, options?: Partial<TFetchOptions>): Promise<unknown> {
    const fullUrl = this.buildUrl(url);

    // Merge headers and normalize to string values, skipping null/undefined
    const mergedHeaders: THeaders = {
      ...this.fetchHeaders,
      ...(options?.headers ?? {}),
    };
    const headers = this.normalizeHeaders(mergedHeaders);

    // Determine body and content-type handling
    let body: BodyInit | undefined;
    const isFormData = typeof FormData !== 'undefined' && data instanceof FormData;
    const isBlob = typeof Blob !== 'undefined' && data instanceof Blob;

    if (data !== undefined) {
      if (isFormData || isBlob) {
        body = data as BodyInit;
      } else if (method !== 'GET' && method !== 'HEAD') {
        body = JSON.stringify(data);
        if (!headers.has('Content-Type')) {
          headers.set('Content-Type', 'application/json');
        }
      }
    }

    const fetchOptions: RequestInit & {
      next?: { tags?: string[]; revalidate?: number };
    } = {
      method,
      headers,
      body,
      // cache: options?.cache ?? 'no-store', // default to no-store
      cache: 'no-store', // todo: 'no-store' for experimental purposes
      credentials: 'include',
      mode: 'cors',
      referrerPolicy: this.referrerPolicy,
      next: options?.next,
    };

    const response = await fetch(fullUrl, fetchOptions);
    this.responseHeaders = response.headers;

    if (!response.ok) {
      const message = await this.safeReadText(response).catch(() => '');
      throw new Error(`Request failed: ${response.status} ${response.statusText}${message ? ` - ${message}` : ''}`);
    }

    if (response.status === 204) {
      return undefined;
    }

    const contentType = response.headers.get('Content-Type') ?? '';
    if (contentType.includes('application/json')) {
      return response.json();
    }
    return this.safeReadText(response);
  }

  private buildUrl(url: TUrl): TUrl {
    // If proxy mode is enabled, convert any URL into a same-origin proxy path.
    // Requires a Next.js rewrite: /api/proxy/:path* -> <BACKEND_BASE>/:path*
    const useProxy = env.NEXT_PUBLIC_USE_API_PROXY === true;
    const proxyPrefix = env.NEXT_PUBLIC_API_PROXY_PREFIX || 'http://localhost:3000/api/proxy';

    if (useProxy) {
      // Absolute URL: strip origin, keep pathname + search
      if (/^https?:\/\//i.test(url)) {
        const u = new URL(url);
        const path = `${u.pathname}${u.search}${u.hash}`;
        return `${proxyPrefix}${path}` as TUrl;
      }
      // Root-relative path
      if (url.startsWith('/')) {
        return `${proxyPrefix}${url}` as TUrl;
      }
      // Plain path or query-only string
      {
        const normalized = url.startsWith('/') ? url : `/${url}`;
        return `${proxyPrefix}${normalized}` as TUrl;
      }
      // If TUrl is a different type, fall back to original behavior
    }

    // Absolute URL or already includes protocol
    if (/^https?:\/\//i.test(url)) return url;

    // Relative path that needs base URL
    if (url.startsWith('/')) {
      if (!this.baseUrl) {
        throw new Error('Base URL is not set for relative request path');
      }
      return new URL(url, this.baseUrl).toString() as TUrl;
    }

    // Plain path or query-only string
    if (this.baseUrl) {
      return new URL(url, this.baseUrl.replace(/\/+$/, '/')).toString() as TUrl;
    }

    return url;
  }

  private normalizeHeaders(input: THeaders): Headers {
    const headers = new Headers();
    Object.entries(input).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      headers.set(key, String(value));
    });
    return headers;
  }

  private async safeReadText(response: Response): Promise<string> {
    try {
      return await response.text();
    } catch {
      return '';
    }
  }
}
