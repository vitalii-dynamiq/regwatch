import WidgetCard from '@/components/molecules/WidgetCard';
import { AlertWidgetUrgentList } from '@/components/organisms/Alerts/AlertWidgetUrgentList';
import { ALERTS_PAGE } from '@/lib/constants/common';
import { AlertTriangle } from 'lucide-react';

export default function WidgetUrgentAlerts() {
  return (
    <WidgetCard icon={AlertTriangle} title='Urgent Alerts' href={ALERTS_PAGE}>
      <AlertWidgetUrgentList />
    </WidgetCard>
  );
}
