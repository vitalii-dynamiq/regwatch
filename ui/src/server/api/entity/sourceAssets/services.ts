import Repository from '@/server/api/entity/sourceAssets/repository';
import { type SourceAsset, sourceAssetSchema } from '@/server/api/entity/sourceAssets/types';

const repo = new Repository();

export const fetchSourceAssets = async (): Promise<SourceAsset> => {
  const data = await repo.getAll();
  return sourceAssetSchema.parse(data);
};
