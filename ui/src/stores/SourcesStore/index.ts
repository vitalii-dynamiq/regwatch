import type { SourcesState } from '@/stores/SourcesStore/types';
import { createSelectableStore } from '@/stores/_shared/createSelectableStore';
const useSourcesStore = createSelectableStore<SourcesState['items'][number]>();
export default useSourcesStore;
