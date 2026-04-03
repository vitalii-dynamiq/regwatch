import BaseRepository from '@/lib/repositories/baseRepository';
import type {
  Obligation,
  ObligationBulkDeleteDto,
  ObligationCreateDto,
  ObligationPatchDto,
  ObligationUpdateDto,
} from '@/server/api/entity/obligation/types';

export default class Repository extends BaseRepository<
  Obligation,
  ObligationCreateDto,
  ObligationUpdateDto,
  ObligationPatchDto
> {
  protected endpoint: string = '/v1/obligations';

  async bulkDelete(deleteDto: ObligationBulkDeleteDto) {
    const baseUrl = this.buildUrl();

    return this.request<boolean>('bulk delete obligation', () => this.fetcher.delete(baseUrl, deleteDto));
  }
}
