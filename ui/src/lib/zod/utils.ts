import { idStringSchema, uuIdSchema } from '@/lib/zod/base';
import { z } from 'zod';

// 🧩 Pagination schema factory
export const paginationSchema = z.object({
  totalItems: z.number().nullable().optional(),
  page: z.number().nullable(),
  pageSize: z.number().nullable(),
  totalPages: z.number().nullable().optional(),
});

export const createPaginationSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  paginationSchema.extend({
    items: z.array(itemSchema),
  });

// 🧩 UUID helpers
export const uuidSchema = (label = 'ID') => z.string().uuid({ message: `Invalid ${label}` });

export const requiredUuid = (label = 'ID') =>
  z
    .string()
    .trim()
    .min(1, { message: `${label} is required` })
    .uuid({ message: `Invalid ${label}` });

export const optionalUuidFromEmpty = z
  .union([z.literal(''), uuIdSchema])
  .optional()
  .transform((v) => (v === '' ? undefined : v));

export const optionalStringFromEmpty = z
  .union([z.literal(''), idStringSchema])
  .optional()
  .transform((v) => (v === '' ? null : v));

export const searchSchema = z.record(
  z.string().trim(),
  z.union([z.literal(''), z.string().trim().min(1, 'Enter at least 1 characters to search')])
);
