import type { EditableFieldTextareaProps } from '@/components/molecules/EditableFieldTextarea/types';
import type { Obligation, ObligationPatchDto } from '@/server/api/entity/obligation/types';

export type ObligationEditableFieldTextareaProps = Omit<
  EditableFieldTextareaProps<ObligationPatchDto>,
  'validationSchema' | 'mutationHook'
> & {
  id: Obligation['id'];
};
