import WidgetCard from '@/components/molecules/WidgetCard';
import { ObligationWidgetCount } from '@/components/organisms/Obligations/ObligationWidgetCount';
import { FileCheck } from 'lucide-react';

export default function WidgetObligations() {
  return (
    <WidgetCard icon={FileCheck} title='Obligations'>
      <ObligationWidgetCount />
    </WidgetCard>
  );
}
