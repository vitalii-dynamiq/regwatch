import { itemJurisdictionsSchema, itemSchema } from '@/lib/zod';
import { z } from 'zod';

export const sourceAssetSchema = z.object({
  jurisdictions: z.array(itemJurisdictionsSchema),
  content_types: z.array(itemSchema),
  monitoring_frequency: z.array(itemSchema),
});

export type SourceAsset = z.infer<typeof sourceAssetSchema>;
export type SourceAssetCreateDto = {};
export type SourceAssetUpdateDto = {};
export type SourceAssetPatchDto = {};
