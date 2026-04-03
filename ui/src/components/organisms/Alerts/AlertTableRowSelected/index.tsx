'use client';
import { AlertDialog } from '@/components/molecules/AlertDialog';
import TableRowSelected from '@/components/molecules/TableRowSelected';
import { useBalkDeleteAlert, useDeleteAlert } from '@/server/api/entity/alert/queries';
import type { Alert } from '@/server/api/entity/alert/types';
import useAlertsStore from '@/stores/AlertsStore';
import { Trash } from 'lucide-react';
import { useCallback } from 'react';

export default function AlertTableRowSelected() {
  const { selected, clearAllSelected } = useAlertsStore();
  const { mutateAsync: deleteAsync } = useBalkDeleteAlert();

  // Helper: consistently render selected titles list
  const renderSelectedTitles = useCallback(() => {
    return (
      <span className='mt-2 block text-xs border rounded-md p-2 h-40 overflow-y-auto'>
        {selected.map((alert) => (
          <span key={alert.id} className='block text-xs'>
            {alert.title ?? 'Untitled'}
          </span>
        ))}
      </span>
    );
  }, [selected]);

  const handleDeleteSelectedAlerts = useCallback(async () => {
    const ids = selected.map((alert) => alert.id);
    deleteAsync({ ids });
  }, [deleteAsync, selected]);

  const selectedCount = selected.length;
  const dialogDeleteTitle = `Delete all ${selectedCount} selected sources`;

  return (
    <TableRowSelected selected={selected.length} clearAllSelected={clearAllSelected}>
      <AlertDialog
        title={dialogDeleteTitle}
        triggerButton={{
          variant: 'destructive',
          label: <Trash size={14} />,
        }}
        description={
          <>
            Are you sure you want to delete all selected sources? This action cannot be undone.
            <br />
            Also please check below the details of the sources before deleting.
            {renderSelectedTitles()}
          </>
        }
        actionButton={{
          label: 'Delete',
          onClick: handleDeleteSelectedAlerts,
        }}
      />
    </TableRowSelected>
  );
}
