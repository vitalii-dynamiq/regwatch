import type { EditableFieldSelectProps } from '@/components/molecules/EditableFieldSelect/types';
import type { Obligation, ObligationPatchDto } from '@/server/api/entity/obligation/types';

export type ObligationEditableFieldSelectProps = Omit<
  EditableFieldSelectProps<ObligationPatchDto>,
  'validationSchema' | 'mutationHook'
> & {
  id: Obligation['id'];
};
