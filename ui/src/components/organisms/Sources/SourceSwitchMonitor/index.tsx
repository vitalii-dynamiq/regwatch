import { usePatchSource } from '@/server/api/entity/source/queries';
import type { Source } from '@/server/api/entity/source/types';
import { Switch } from '@/ui/switch';
import { useState } from 'react';

export default function SourceMonitorSwitch({ data }: { data: Source | null }) {
  if (!data) return null;

  const [isSwitch, setSwitch] = useState<boolean>(Boolean(data.monitoring_enabled));

  const { mutate, isPending } = usePatchSource(data.id);

  const handleSwitch = (nextChecked: boolean) => {
    if (!data.id) return;
    const prev = isSwitch;
    setSwitch(nextChecked);
    mutate(
      { monitoring_enabled: nextChecked },
      {
        onError: () => {
          setSwitch(prev);
        },
      }
    );
  };

  return <Switch disabled={isPending} checked={isSwitch} onCheckedChange={handleSwitch} />;
}
