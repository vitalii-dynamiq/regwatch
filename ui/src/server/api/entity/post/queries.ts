'use client';

import type { Post, PostPatchDto, PostUpdateDto } from '@/server/api/entity/post/types';

import {
  createPost,
  deletePost,
  fetchPostById,
  fetchPosts,
  patchPost,
  updatePost,
} from '@/server/api/entity/post/services';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });
}

export function usePost(id: Post['id']) {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPostById(id),
    enabled: !!id,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      console.info('Post created successfully.');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

export function useUpdatePost(id: Post['id']) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PostUpdateDto) => updatePost(id, data),
    onSuccess: () => {
      console.info('Post updated successfully.');
      queryClient.invalidateQueries({ queryKey: ['post', id] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error) => {
      console.error('Error updating post:', error);
    },
  });
}

export function usePatchPost(id: Post['id']) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PostPatchDto) => patchPost(id, data),
    onSuccess: () => {
      console.info('Post patched successfully.');
      queryClient.invalidateQueries({ queryKey: ['post', id] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error) => {
      console.error('Error patching post:', error);
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: Post['id']) => deletePost(id),
    onSuccess: () => {
      console.info('Post deleted successfully.');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error) => {
      console.error('Error deleting post:', error);
    },
  });
}
