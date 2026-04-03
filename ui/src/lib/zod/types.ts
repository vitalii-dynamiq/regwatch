import { z } from 'zod';
import { idSchema } from './base';
import { paginationSchema, searchSchema } from './utils';

export type Id = z.infer<typeof idSchema>;
export type Pagination = z.infer<typeof paginationSchema>;
export type Search = z.infer<typeof searchSchema>;
