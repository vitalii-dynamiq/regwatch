import BaseRepository from '@/lib/repositories/baseRepository';
import type { Post, PostCreateDto, PostPatchDto, PostUpdateDto } from '@/server/api/entity/post/types';

export default class PostRepository extends BaseRepository<Post, PostCreateDto, PostUpdateDto, PostPatchDto> {
  protected endpoint: string = '/api/fake/posts';
}
