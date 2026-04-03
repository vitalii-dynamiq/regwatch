'use client';

import type { UserPatchDto } from '@/server/api/entity/user/types';

import QUERY_KEYS from '@/lib/constants/queryKeys';
import type { SearchParamsQuery } from '@/lib/constants/searchParams';
import { fetchMe, fetchPaginationUsers, patchMe } from '@/server/api/entity/user/services';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useUsersPagination(params: SearchParamsQuery) {
  return useQuery({
    queryKey: [QUERY_KEYS.users, params],
    queryFn: () => fetchPaginationUsers(params),
  });
}

export function useMe() {
  return useQuery({
    queryKey: [QUERY_KEYS.me],
    queryFn: () => fetchMe(),
    enabled: true,
  });
}

export function usePatchMe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UserPatchDto) => patchMe(data),
    onSuccess: () => {
      console.info('User patched successfully.');
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.me] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.users] });
      toast.success('User patched successfully');
    },
    onError: (error) => {
      console.error('Error patching user:', error);
    },
  });
}
