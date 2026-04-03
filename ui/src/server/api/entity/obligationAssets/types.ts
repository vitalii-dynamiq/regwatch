import { itemSchema } from '@/lib/zod';
import { z } from 'zod';

export const obligationAssetSchema = z.object({
  statuses: z.array(itemSchema),
  risk_levels: z.array(itemSchema),
  obligation_types: z.array(itemSchema),
  content_types: z.array(itemSchema),
});

export type ObligationAsset = z.infer<typeof obligationAssetSchema>;
export type ObligationAssetCreateDto = {};
export type ObligationAssetUpdateDto = {};
export type ObligationAssetPatchDto = {};
