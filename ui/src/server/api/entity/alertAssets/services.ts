import Repository from '@/server/api/entity/alertAssets/repository';
import { type AlertAsset, alertAssetSchema } from '@/server/api/entity/alertAssets/types';

const repo = new Repository();

export const fetchAlertAssets = async (): Promise<AlertAsset> => {
  const data = await repo.getAll();
  return alertAssetSchema.parse(data);
};
