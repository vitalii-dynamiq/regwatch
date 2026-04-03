import type { EditableFieldDatepickerProps } from '@/components/molecules/EditableFieldDatepicker/types';
import type { Obligation, ObligationPatchDto } from '@/server/api/entity/obligation/types';

export type ObligationEditableFieldDatepickerProps = Omit<
  EditableFieldDatepickerProps<ObligationPatchDto>,
  'validationSchema' | 'mutationHook'
> & {
  id: Obligation['id'];
};
