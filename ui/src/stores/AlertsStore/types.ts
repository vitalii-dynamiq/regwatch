import type { Alert } from '@/server/api/entity/alert/types';
import type { SelectableState } from '@/stores/_shared/types';

export interface AlertsState extends SelectableState<Alert> {}
