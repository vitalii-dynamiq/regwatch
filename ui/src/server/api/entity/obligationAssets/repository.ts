import BaseRepository from '@/lib/repositories/baseRepository';
import type {
  ObligationAsset,
  ObligationAssetCreateDto,
  ObligationAssetPatchDto,
  ObligationAssetUpdateDto,
} from '@/server/api/entity/obligationAssets/types';

export default class Repository extends BaseRepository<
  ObligationAsset,
  ObligationAssetCreateDto,
  ObligationAssetUpdateDto,
  ObligationAssetPatchDto
> {
  protected endpoint: string = '/v1/obligations/assets';
}
