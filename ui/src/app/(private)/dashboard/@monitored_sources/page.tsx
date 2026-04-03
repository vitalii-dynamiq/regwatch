import WidgetCard from '@/components/molecules/WidgetCard';
import { SourceWidgetMonitoredSources } from '@/components/organisms/Sources/SourceWidgetMonitoredSources';
import { Radar } from 'lucide-react';

export default function WidgetMonitoredSources() {
  return (
    <WidgetCard icon={Radar} title='Monitored Sources'>
      <SourceWidgetMonitoredSources />
    </WidgetCard>
  );
}
