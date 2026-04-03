import Repository from '@/server/api/entity/post/repository';
import {
  type Post,
  type PostCreateDto,
  type PostUpdateDto,
  createPostSchema,
  patchPostSchema,
  postArraySchema,
  postSchema,
  updatePostSchema,
} from '@/server/api/entity/post/types';

import { factoryCrudService } from '@/server/api/_shared/factoryCrudService';

const repo = new Repository();

export const postService = factoryCrudService<Post, PostCreateDto, PostUpdateDto, Partial<PostUpdateDto>>({
  repo,
  schemas: {
    list: postArraySchema,
    item: postSchema,
    create: createPostSchema,
    update: updatePostSchema,
    patch: patchPostSchema,
  },
});

export const fetchPosts = postService.fetchAll;
export const fetchPostById = postService.fetchById;
export const createPost = postService.create;
export const updatePost = postService.update;
export const patchPost = postService.patch;
export const deletePost = postService.delete;
