import Repository from '@/server/api/entity/obligationAssets/repository';
import { type ObligationAsset, obligationAssetSchema } from '@/server/api/entity/obligationAssets/types';

const repo = new Repository();

export const fetchObligationAssets = async (): Promise<ObligationAsset> => {
  const data = await repo.getAll();
  return obligationAssetSchema.parse(data);
};
