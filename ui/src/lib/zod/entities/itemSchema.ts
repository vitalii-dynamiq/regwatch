import { z } from 'zod';
import { idSchema, makeNullableString, makeRequiredString, makeUrlSchema } from '..';

export const itemSchema = z.object({
  id: idSchema,
  name: makeRequiredString('Name'),
  description: makeNullableString().optional(),
});

export const itemSourceSchema = z.object({
  id: idSchema,
  name: makeRequiredString('Source name'),
  base_url: makeUrlSchema('Base URL'),
});

export const itemRegulatoryMetadataSchema = z.object({}).passthrough();

export const itemJurisdictionsSchema = z.object({
  ...itemSchema.shape,
  code: z.string(),
});
