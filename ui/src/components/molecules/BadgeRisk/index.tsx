import type { RiskBadgeProps } from '@/components/molecules/BadgeRisk/types';
import { cn } from '@/lib/utils';

export function BadgeRisk({ risk }: RiskBadgeProps) {
  const normalized = String(risk)?.toLowerCase();

  const colors: Record<string, string> = {
    high: 'bg-red-50 border-red-200 text-red-800',
    medium: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    low: 'bg-green-50 border-green-200 text-green-800',
    unknown: 'bg-gray-50 border-gray-200 text-gray-800',
  };

  const riskLabel = normalized && ['high', 'medium', 'low'].includes(normalized) ? normalized : 'unknown';

  return (
    <span className={cn('px-2.5 py-0.5 text-xs font-medium rounded-lg capitalize border', colors[riskLabel])}>
      {riskLabel}
    </span>
  );
}
