'use client';

import QUERY_KEYS from '@/lib/constants/queryKeys';
import type { SearchParamsQuery } from '@/lib/constants/searchParams';
import { toast } from '@/lib/utils';
import {
  bulkDeleteObligation,
  createObligation,
  deleteObligation,
  fetchObligationById,
  fetchPaginationObligations,
  patchObligation,
} from '@/server/api/entity/obligation/services';
import type { Obligation, ObligationBulkDeleteDto, ObligationPatchDto } from '@/server/api/entity/obligation/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useObligationsPagination(params: SearchParamsQuery) {
  return useQuery({
    queryKey: [QUERY_KEYS.obligations, params],
    queryFn: () => fetchPaginationObligations(params),
  });
}

export function useObligation(id: Obligation['id']) {
  return useQuery({
    queryKey: [QUERY_KEYS.obligation, id],
    queryFn: () => fetchObligationById(id),
    enabled: !!id,
  });
}

export function useCreateObligation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createObligation,
    onSuccess: () => {
      toast.success('Obligation created successfully.');
      console.info('Obligation created successfully.');
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.obligations] });
    },
    onError: (error) => {
      toast.error('Error creating obligation');
      console.error('Error creating obligation:', error);
    },
  });
}

export function usePatchObligation(id: Obligation['id']) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ObligationPatchDto) => patchObligation(id, data),
    onSuccess: (_data) => {
      console.info('Obligation patched successfully.');
      toast.success('Obligation patched successfully.');
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.obligation] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.obligations] });
    },
    onError: (error) => {
      toast.error('Error patching obligation');
      console.error('Error patching obligation:', error);
    },
  });
}

export function useDeleteObligation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: Obligation['id']) => deleteObligation(id),
    onSuccess: () => {
      console.info('Obligation deleted successfully.');
      toast.success('Obligation deleted successfully.');
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.obligations] });
    },
    onError: (error) => {
      toast.error('Error deleting obligation');
      console.error('Error deleting obligation:', error);
    },
  });
}

export function useBalkDeleteObligation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ ids }: ObligationBulkDeleteDto) => bulkDeleteObligation({ ids }),
    onSuccess: () => {
      console.info('Obligations bulk delete successful.');
      toast.success('Obligations deleted successfully.');
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.obligations] });
    },
    onError: (error) => {
      console.error('Error bulk deleting obligations:', error);
      toast.error('Failed to delete obligations.');
    },
  });
}

export function usePatchObligationRegulatoryMetaData(id: Obligation['id']) {
  const queryClient = useQueryClient();

  const { data: obligation } = useQuery({
    queryKey: [QUERY_KEYS.obligation, id],
    queryFn: () => fetchObligationById(id),
    enabled: !!id,
  });

  const patchRegulatoryMetaData = async (patch: ObligationPatchDto) => {
    if (!id) throw new Error('Obligation id is required');

    const currentObligation = obligation ?? (await fetchObligationById(id));
    if (!currentObligation) throw new Error('Obligation not found');

    const { regulatory_metadata } = currentObligation;

    const patchData = { ...regulatory_metadata, ...patch.regulatory_metadata };

    return patchObligation(id, {
      regulatory_metadata: patchData,
    });
  };

  return useMutation({
    mutationFn: patchRegulatoryMetaData,
    onSuccess: (_data) => {
      console.info('Obligation patched successfully.');
      toast.success('Obligation patched successfully.');
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.obligation] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.obligations] });
    },
    onError: (error) => {
      toast.error('Error patching obligation');
      console.error('Error patching obligation:', error);
    },
  });
}
