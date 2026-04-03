'use client';

import QUERY_KEYS from '@/lib/constants/queryKeys';
import type { SearchParamsQuery } from '@/lib/constants/searchParams';
import {
  bulkDeleteSource,
  bulkPatchSource,
  createSource,
  deleteSource,
  fetchPaginationSources,
  fetchSourceById,
  patchSource,
} from '@/server/api/entity/source/services';
import type { Source, SourceBulkDeleteDto, SourceBulkPatchDto, SourcePatchDto } from '@/server/api/entity/source/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
export function useSourcesPagination(params: SearchParamsQuery) {
  return useQuery({
    queryKey: [QUERY_KEYS.sources, params],
    queryFn: () => fetchPaginationSources(params),
  });
}

export function useSource(id: Source['id']) {
  return useQuery({
    queryKey: [QUERY_KEYS.source, id],
    queryFn: () => fetchSourceById(id),
    enabled: !!id,
  });
}

export function useCreateSource() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSource,
    onSuccess: () => {
      console.info('Source created successfully.');
      toast.success('Source created successfully');
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.sources] });
    },
    onError: (error) => {
      console.error('Error creating source:', error);
      toast.error('Failed to create source');
    },
  });
}

export function usePatchSource(id: Source['id']) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SourcePatchDto) => patchSource(id, data),
    onSuccess: () => {
      console.info('Source patched successfully.');
      toast.success('Source patched successfully');
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.source] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.sources] });
    },
    onError: (error) => {
      console.error('Error patching source:', error);
      toast.error('Failed to patch source');
    },
  });
}

export function useDeleteSource() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: Source['id']) => deleteSource(id),
    onSuccess: () => {
      console.info('Source deleted successfully.');
      toast.success('Source deleted successfully.');
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.sources] });
    },
    onError: (error) => {
      console.error('Error deleting source:', error);
      toast.success('Failed to delete source.');
    },
  });
}

export function useBalkPatchMonitoringSource() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      ids,
      isMonitor,
    }: { ids: SourceBulkPatchDto['ids']; isMonitor: SourceBulkPatchDto['monitoring_enabled'] }) =>
      bulkPatchSource({
        ids,
        ...{
          monitoring_enabled: isMonitor,
        },
      }),
    onSuccess: () => {
      console.info('Source bulk monitoring update successful.');
      toast.success('Source monitoring status updated successfully.');
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.sources] });
    },
    onError: (error) => {
      console.error('Error bulk monitoring update source:', error);
      toast.success('Failed to update bulk monitoring source.');
    },
  });
}

export function useBalkDeleteSource() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ ids }: SourceBulkDeleteDto) => bulkDeleteSource({ ids }),
    onSuccess: () => {
      console.info('Sources bulk delete successful.');
      toast.success('Sources deleted successfully.');
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.sources] });
    },
    onError: (error) => {
      console.error('Error bulk deleting sources:', error);
      toast.error('Failed to delete sources.');
    },
  });
}
