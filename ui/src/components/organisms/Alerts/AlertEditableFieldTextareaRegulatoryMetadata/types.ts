import type { EditableFieldTextareaProps } from '@/components/molecules/EditableFieldTextarea/types';
import type { Alert, AlertPatchDto } from '@/server/api/entity/alert/types';

export type AlertEditableFieldTextareaRegulatoryMetadataProps = Omit<
  EditableFieldTextareaProps<AlertPatchDto>,
  'validationSchema' | 'mutationHook'
> & {
  id: Alert['id'];
};
