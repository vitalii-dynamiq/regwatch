'use client';
import { AlertDialog } from '@/components/molecules/AlertDialog';
import TableRowSelected from '@/components/molecules/TableRowSelected';
import { useBalkDeleteObligation, useDeleteObligation } from '@/server/api/entity/obligation/queries';
import useObligationStore from '@/stores/ObligationsStore';
import { Trash } from 'lucide-react';
import { useCallback, useMemo } from 'react';

export default function ObligationTableRowSelected() {
  const { selected, clearAllSelected } = useObligationStore();
  const { mutateAsync: deleteAsync } = useBalkDeleteObligation();

  const selectedCount = useMemo(() => selected.length, [selected]);

  const renderedSelectedTitles = useMemo(
    () => (
      <span className='mt-2 block text-xs border rounded-md p-2 h-40 overflow-y-auto'>
        {selected.map((obligation) => (
          <span key={obligation.id} className='block text-xs'>
            {obligation.title ?? 'Untitled'}
          </span>
        ))}
      </span>
    ),
    [selected]
  );

  const handleDeleteSelectedObligations = useCallback(async () => {
    const ids = selected.map((s) => s.id);
    deleteAsync({ ids });
    clearAllSelected();
  }, [deleteAsync, selected, clearAllSelected]);

  const dialogTitle = 'Delete all selected obligations';

  return (
    <TableRowSelected selected={selectedCount} clearAllSelected={clearAllSelected}>
      <AlertDialog
        title={dialogTitle}
        triggerButton={{
          variant: 'destructive',
          label: <Trash size={14} />,
        }}
        description={
          <>
            Are you sure you want to delete all selected obligations? This action cannot be undone.
            <br />
            Also please check below the details of the obligations before deleting.
            {renderedSelectedTitles}
          </>
        }
        actionButton={{
          onClick: handleDeleteSelectedObligations,
        }}
      />
    </TableRowSelected>
  );
}
