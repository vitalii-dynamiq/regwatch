import { itemSchema } from '@/lib/zod';
import { z } from 'zod';

export const alertAssetSchema = z.object({
  statuses: z.array(itemSchema),
  risk_levels: z.array(itemSchema),
  alert_types: z.array(itemSchema),
  content_types: z.array(itemSchema),
});

export type AlertAsset = z.infer<typeof alertAssetSchema>;
export type AlertAssetCreateDto = {};
export type AlertAssetUpdateDto = {};
export type AlertAssetPatchDto = {};
