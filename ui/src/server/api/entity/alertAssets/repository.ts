import BaseRepository from '@/lib/repositories/baseRepository';
import type {
  AlertAsset,
  AlertAssetCreateDto,
  AlertAssetPatchDto,
  AlertAssetUpdateDto,
} from '@/server/api/entity/alertAssets/types';

export default class Repository extends BaseRepository<
  AlertAsset,
  AlertAssetCreateDto,
  AlertAssetUpdateDto,
  AlertAssetPatchDto
> {
  protected endpoint: string = '/v1/alerts/assets';
}
