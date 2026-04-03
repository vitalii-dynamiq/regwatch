import BaseRepository from '@/lib/repositories/baseRepository';
import type {
  Source,
  SourceBulkDeleteDto,
  SourceBulkPatchDto,
  SourceCreateDto,
  SourcePatchDto,
  SourceUpdateDto,
} from '@/server/api/entity/source/types';

export default class Repository extends BaseRepository<Source, SourceCreateDto, SourceUpdateDto, SourcePatchDto> {
  protected endpoint: string = '/v1/sources';

  async bulkPatch(patchDto: SourceBulkPatchDto) {
    const baseUrl = this.buildUrl();
    return this.request<Source>('bulk patch resource', () => this.fetcher.patch(baseUrl, patchDto));
  }

  async bulkDelete(deleteDto: SourceBulkDeleteDto) {
    const baseUrl = this.buildUrl();
    return this.request<boolean>('bulk delete resource', () => this.fetcher.delete(baseUrl, deleteDto));
  }
}
