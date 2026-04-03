import type { Obligation } from '@/server/api/entity/obligation/types';
import type { SelectableState } from '@/stores/_shared/types';

export interface ObligationsState extends SelectableState<Obligation> {}
