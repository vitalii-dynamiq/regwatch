import type { AlertsState } from '@/stores/AlertsStore/types';
import { createSelectableStore } from '@/stores/_shared/createSelectableStore';
const useAlertsStore = createSelectableStore<AlertsState['items'][number]>();
export default useAlertsStore;
