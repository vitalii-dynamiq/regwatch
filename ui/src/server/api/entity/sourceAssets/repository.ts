import BaseRepository from '@/lib/repositories/baseRepository';
import type {
  SourceAsset,
  SourceAssetCreateDto,
  SourceAssetPatchDto,
  SourceAssetUpdateDto,
} from '@/server/api/entity/sourceAssets/types';

export default class Repository extends BaseRepository<
  SourceAsset,
  SourceAssetCreateDto,
  SourceAssetUpdateDto,
  SourceAssetPatchDto
> {
  protected endpoint: string = '/v1/sources/assets';
}
