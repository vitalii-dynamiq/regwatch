import type { EditableFieldSelectProps } from '@/components/molecules/EditableFieldSelect/types';
import type { Alert, AlertPatchDto } from '@/server/api/entity/alert/types';

export type AlertEditableFieldSelectProps = Omit<
  EditableFieldSelectProps<AlertPatchDto>,
  'validationSchema' | 'mutationHook'
> & {
  id: Alert['id'];
};
