'use client';
import { AlertDialog } from '@/components/molecules/AlertDialog';
import TableRowSelected from '@/components/molecules/TableRowSelected';
import { useBalkDeleteSource, useBalkPatchMonitoringSource } from '@/server/api/entity/source/queries';
import useSourcesStore from '@/stores/SourcesStore';
import { Label } from '@/ui/label';
import { Separator } from '@/ui/separator';
import { Switch } from '@/ui/switch';
import { Trash } from 'lucide-react';
import { useCallback, useState } from 'react';

export default function SourceTableRowSelected() {
  const [isMonitorDialogOpen, setIsMonitorDialogOpen] = useState<boolean>(false);
  const [isMonitor, setIsMonitor] = useState<boolean>(false);
  const { selected, clearAllSelected } = useSourcesStore();
  const { mutateAsync: monitorAsync } = useBalkPatchMonitoringSource();
  const { mutateAsync: deleteAsync } = useBalkDeleteSource();

  // Helper: consistently render selected titles list
  const renderSelectedTitles = useCallback(() => {
    return (
      <span className='mt-2 block text-xs border rounded-md p-2 h-40 overflow-y-auto'>
        {selected.map((source) => (
          <span key={source.id} className='block text-xs'>
            {source.name ?? 'Untitled'}
          </span>
        ))}
      </span>
    );
  }, [selected]);

  const handleDeleteSelectedSources = useCallback(async () => {
    const ids = selected.map((s) => s.id);
    deleteAsync({ ids });
  }, [deleteAsync, selected]);

  // TODO: replace with real "monitor" API action when available
  const handleMonitorSelectedSources = useCallback(async () => {
    const ids = selected.map((s) => s.id);
    monitorAsync({ ids, isMonitor });
  }, [monitorAsync, selected, isMonitor]);

  const handleMonitorToggle = (checked: boolean) => {
    setIsMonitorDialogOpen(true);
    setIsMonitor(checked);
  };

  const selectedCount = selected.length;
  const dialogDeleteTitle = `Delete all ${selectedCount} selected sources`;
  const dialogMonitorTitle = `Monitor all ${selectedCount} selected sources`;

  return (
    <TableRowSelected selected={selected.length} clearAllSelected={clearAllSelected}>
      <div className='flex items-center space-x-2'>
        <Switch id='airplane-mode' onCheckedChange={handleMonitorToggle} />
        <Label htmlFor='airplane-mode'>Monitor</Label>
        <AlertDialog
          open={isMonitorDialogOpen}
          onOpenChange={setIsMonitorDialogOpen}
          title={dialogMonitorTitle}
          showTriggerButton={false}
          description={
            <>
              Are you sure you want to monitor all selected sources?
              <br />
              Also please check below the details of the sources before monitoring.
              {renderSelectedTitles()}
            </>
          }
          actionButton={{
            label: isMonitor ? 'Enable monitoring' : 'Disable monitoring',
            onClick: handleMonitorSelectedSources,
          }}
        />
      </div>
      <Separator orientation='vertical' className='mx-2 data-[orientation=vertical]:h-4' />
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
          onClick: handleDeleteSelectedSources,
        }}
      />
    </TableRowSelected>
  );
}
