'use client';

import QUERY_KEYS from '@/lib/constants/queryKeys';
import type { SearchParamsQuery } from '@/lib/constants/searchParams';
import {
  bulkDeleteAlert,
  deleteAlert,
  fetchAlertById,
  fetchPaginationAlerts,
  patchAlert,
} from '@/server/api/entity/alert/services';
import type { Alert, AlertPatchDto } from '@/server/api/entity/alert/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useAlertsPagination(params: SearchParamsQuery) {
  return useQuery({
    queryKey: [QUERY_KEYS.alerts, params],
    queryFn: () => fetchPaginationAlerts(params),
  });
}

export function useAlert(id: Alert['id']) {
  return useQuery({
    queryKey: [QUERY_KEYS.alert, id],
    queryFn: () => fetchAlertById(id),
    enabled: !!id,
  });
}

export function usePatchAlert(id: Alert['id']) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AlertPatchDto) => patchAlert(id, data),
    onSuccess: (_data) => {
      console.info('Alert patched successfully.');
      toast.success('Alert patched successfully');
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.alert] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.alerts] });
    },
    onError: (error) => {
      console.error('Error patching alert:', error);
      toast.error('Failed to patch alert');
    },
  });
}

export function useDeleteAlert() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: Alert['id']) => deleteAlert(id),
    onSuccess: () => {
      console.info('Alert deleted successfully.');
      toast.success('Alert deleted successfully.');
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.alerts] });
    },
    onError: (error) => {
      console.error('Error deleting alert:', error);
      toast.success('Failed to delete alert.');
    },
  });
}

export function useBalkDeleteAlert() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ ids }: { ids: Alert['id'][] }) => bulkDeleteAlert({ ids }),
    onSuccess: () => {
      console.info('Alerts bulk delete successful.');
      toast.success('Alerts deleted successfully.');
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.alerts] });
    },
    onError: (error) => {
      console.error('Error bulk deleting alerts:', error);
      toast.error('Failed to delete alerts.');
    },
  });
}

export function usePatchAlertRegulatoryMetaData(id: Alert['id']) {
  const queryClient = useQueryClient();

  const { data: alert } = useQuery({
    queryKey: [QUERY_KEYS.alert, id],
    queryFn: () => fetchAlertById(id),
    enabled: !!id,
  });

  const patchRegulatoryMetaData = async (patch: AlertPatchDto) => {
    if (!id) throw new Error('Alert id is required');

    const currentAlert = alert ?? (await fetchAlertById(id));
    if (!currentAlert) throw new Error('Alert not found');

    const { regulatory_metadata } = currentAlert;

    const patchData = { ...regulatory_metadata, ...patch.regulatory_metadata };

    return patchAlert(id, {
      regulatory_metadata: patchData,
    });
  };

  return useMutation({
    mutationFn: patchRegulatoryMetaData,
    onSuccess: (_data) => {
      console.info('Alert patched successfully.');
      toast.success('Alert patched successfully.');
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.alert] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.alerts] });
    },
    onError: (error) => {
      toast.error('Error patching alert');
      console.error('Error patching alert:', error);
    },
  });
}
