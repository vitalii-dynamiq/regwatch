import type { ObligationsState } from '@/stores/ObligationsStore/types';
import { createSelectableStore } from '@/stores/_shared/createSelectableStore';
const useObligationStore = createSelectableStore<ObligationsState['items'][number]>();
export default useObligationStore;
