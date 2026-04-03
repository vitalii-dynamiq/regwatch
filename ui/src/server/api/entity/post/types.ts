import { idSchema } from '@/lib/zod';
import { z } from 'zod';

const _userIdSchema = z.number();
const titleSchema = z.string();
const bodySchema = z.string();

export const postSchema = z.object({
  userId: _userIdSchema.optional(),
  id: idSchema,
  title: z.string(),
  body: z.string(),
});

export const postArraySchema = z.array(postSchema);

export const createPostSchema = z.object({
  body: bodySchema.min(1, 'Body is required'),
  title: titleSchema.min(1, 'Title is required'),
});

/**
 * PUT: requires full object, but ID is excluded.
 */
export const updatePostSchema = createPostSchema;

/**
 * PATCH: allows partial updates, all fields optional.
 */
export const patchPostSchema = createPostSchema.partial();

/**
 * DELETE: requires only the post ID.
 */
export const idValidationSchema = z.object({
  id: idSchema,
});

// Types
export type Post = z.infer<typeof postSchema>;
export type Posts = z.infer<typeof postArraySchema>;
export type PostCreateDto = z.infer<typeof createPostSchema>;
export type PostUpdateDto = z.infer<typeof updatePostSchema>;
export type PostPatchDto = z.infer<typeof patchPostSchema>;
export type PostDeleteDto = z.infer<typeof idValidationSchema>;
