import type { PaginationResponse } from '@/components/molecules/Pagination/types';
import { SIGNIN_PAGE } from '@/lib/constants/common';
import type { SearchParamsQuery } from '@/lib/constants/searchParams';
import { verifySession } from '@/lib/dal';
import Fetcher from '@/lib/fetchers/fetcher';
import type { IFetcher } from '@/lib/fetchers/interface';
import { buildUrlQueryParams } from '@/lib/helpers/buildUrlQueryParams';
import { paginationAdapter } from '@/lib/repositories/paginationAdapter';
import type { Repository } from '@/lib/repositories/types';
import type { Id } from '@/lib/zod';
import { isValidToken } from '@/server/auth/isValidToken';
import { getSession, signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default abstract class BaseRepository<T, TCreateDto, TUpdateDto, TPatchOptionsDto>
  implements Repository<T, TCreateDto, TUpdateDto, TPatchOptionsDto>
{
  protected static fetcher: IFetcher;
  protected abstract endpoint: string;
  protected fetcher: IFetcher;

  // todo: if will use private in 26 line - ensureAuthorizedOnce?: Promise<void>;
  constructor(cookieValue?: string) {
    BaseRepository.fetcher ??= new Fetcher();
    this.fetcher = BaseRepository.fetcher;
    this.fetcher.setCookie(cookieValue);
  }

  // Ensures the current request has a valid session; redirects if not.
  private async ensureAuthorized(): Promise<void> {
    // todo: make sense use this.ensureAuthorizedOnce?
    if (typeof window !== 'undefined') {
      // Client-side check
      const session = await getSession();
      const isValid = isValidToken({
        accessToken: session?.accessToken,
        accessTokenExpires: session?.accessTokenExpires,
      });
      if (session && isValid) {
        this.fetcher.setBearerAuthorization(session.accessToken);
      } else {
        signOut({
          redirect: true,
          redirectTo: SIGNIN_PAGE,
        });
      }
      return;
    }
    // Server-side check
    const { session } = await verifySession();
    if (session) {
      this.fetcher.setBearerAuthorization(session.accessToken);
    } else {
      throw new Error('Unauthorized');
    }
  }

  // Centralized authorization + error handling wrapper.
  private async handleUnauthorizedResponse(error: Error): Promise<never> {
    if (error.message.includes('422')) {
      console.info('422', typeof window !== 'undefined' ? 'client' : 'server');
    }
    if (error.message.includes('401')) {
      console.info('401', typeof window !== 'undefined' ? 'client' : 'server');
      if (typeof window !== 'undefined') {
        signOut({
          redirect: true,
          redirectTo: SIGNIN_PAGE,
        });
      } else {
        // todo: need find way to redirect on server and logout user
        redirect(SIGNIN_PAGE);
      }
    }
    throw error;
  }

  protected async request<T>(operation: string, fn: () => Promise<unknown>): Promise<T> {
    await this.ensureAuthorized();
    try {
      const data = await fn();
      return data as T;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      const formattedError = new Error(`Failed to ${operation}: ${message}`);
      return this.handleUnauthorizedResponse(formattedError);
    }
  }

  async create(dto: TCreateDto): Promise<T> {
    const url = this.buildUrl();
    return this.request<T>('create resource', () => this.fetcher.post(url, dto));
  }

  async getAll(): Promise<T[]> {
    const url = this.buildUrl();
    return this.request<T[]>('get resources', () => this.fetcher.get(url));
  }

  async getOne(id: Id): Promise<T> {
    const url = this.buildUrl(id);
    return this.request<T>('get resource', () => this.fetcher.get(url));
  }

  async update(id: Id, dto: TUpdateDto): Promise<T> {
    const url = this.buildUrl(id);
    return this.request<T>('update resource', () => this.fetcher.put(url, dto));
  }

  async patchOptions(id: Id, dto: TPatchOptionsDto): Promise<T> {
    const url = this.buildUrl(id, 'options');
    return this.request<T>('patch resource options', () => this.fetcher.patch(url, dto));
  }

  async patch(id: Id, dto: TPatchOptionsDto): Promise<T> {
    const url = this.buildUrl(id);
    return this.request<T>('patch resource', () => this.fetcher.patch(url, dto));
  }

  async duplicate(id: Id): Promise<boolean> {
    const url = this.buildUrl(id, 'copy');
    // Return true if request succeeds; throw on error for consistency
    return this.request<boolean>('duplicate resource', async () => {
      await this.fetcher.post(url);
      return true;
    });
  }

  async delete(id: Id): Promise<boolean> {
    const url = this.buildUrl(id);
    return this.request<boolean>('delete resource', async () => {
      await this.fetcher.delete(url);
      return true;
    });
  }

  async getAllWithPagination(params: SearchParamsQuery = {}): Promise<PaginationResponse<T>> {
    const baseUrl = this.buildUrl();
    const url = buildUrlQueryParams(baseUrl, params);
    return this.request<PaginationResponse<T>>('get resources with pagination', async () => {
      const data = await this.fetcher.get(url);
      return paginationAdapter<T>(data) as PaginationResponse<T>;
    });
  }

  // Helpers
  // Safely joins the endpoint with optional path segments, trimming duplicate slashes.
  protected buildUrl(...segments: Array<string | number>): string {
    const base = this.endpoint.replace(/\/+$/, '');
    const path = segments
      .map((s) => String(s).replace(/^\/+|\/+$/g, ''))
      .filter(Boolean)
      .join('/');
    return path ? `${base}/${path}` : base;
  }

  buildUrlPath(...segments: Array<string | number>): string {
    return this.buildUrl(...segments);
  }
}
