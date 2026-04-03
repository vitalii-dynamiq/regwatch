import type { PaginationResponse } from '@/components/molecules/Pagination/types';
import type { SearchParamsQuery } from '@/lib/constants/searchParams';
import { buildUrlQueryParams } from '@/lib/helpers/buildUrlQueryParams';
import BaseRepository from '@/lib/repositories/baseRepository';
import { paginationAdapter } from '@/lib/repositories/paginationAdapter';
import type {
  SourcePage,
  SourcePageCreateDto,
  SourcePagePatchDto,
  SourcePageUpdateDto,
} from '@/server/api/entity/sourcePages/types';

export default class Repository extends BaseRepository<
  SourcePage,
  SourcePageCreateDto,
  SourcePageUpdateDto,
  SourcePagePatchDto
> {
  protected endpoint: string = '/v1/sources';

  async getAllWithPagination(params: SearchParamsQuery = {}): Promise<PaginationResponse<SourcePage>> {
    const { sourceId, ...restParams } = params;
    const baseUrl = this.buildUrl(`/${sourceId}/pages`);
    const url = buildUrlQueryParams(baseUrl, restParams);
    return this.request<PaginationResponse<SourcePage>>('get resources with pagination', async () => {
      const data = await this.fetcher.get(url);
      return paginationAdapter<SourcePage>(data) as PaginationResponse<SourcePage>;
    });
  }
}
