import {
  createPaginationSchema,
  datetimeSchema,
  idSchema,
  makeRequiredBoolean,
  makeRequiredString,
  makeUrlSchema,
} from '@/lib/zod';
import { z } from 'zod';

export const sourcePageSchema = z.object({
  id: idSchema,
  created_at: datetimeSchema,
  updated_at: datetimeSchema,
  last_monitored_at: datetimeSchema,
  url: makeUrlSchema('URL'),
  path: makeRequiredString('Path').nullable(),
  title: makeRequiredString('Title').nullable(),
  is_regulatory: makeRequiredBoolean('Regulatory'),
  alerts_count: z.number(),
});
export const sourcePageArraySchema = z.array(sourcePageSchema);

export const sourcePagePaginationSchema = createPaginationSchema(sourcePageSchema);

export type SourcePage = z.infer<typeof sourcePageSchema>;
export type SourcePages = z.infer<typeof sourcePageArraySchema>;
export type SourcePageCreateDto = {};
export type SourcePageUpdateDto = {};
export type SourcePagePatchDto = {};
