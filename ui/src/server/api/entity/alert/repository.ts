import BaseRepository from '@/lib/repositories/baseRepository';
import type {
  Alert,
  AlertBulkDeleteDto,
  AlertCreateDto,
  AlertPatchDto,
  AlertUpdateDto,
} from '@/server/api/entity/alert/types';

export default class Repository extends BaseRepository<Alert, AlertCreateDto, AlertUpdateDto, AlertPatchDto> {
  protected endpoint: string = '/v1/alerts';

  async bulkDelete(deleteDto: AlertBulkDeleteDto) {
    const baseUrl = this.buildUrl();
    return this.request<boolean>('bulk delete alerts', () => this.fetcher.delete(baseUrl, deleteDto));
  }
}
