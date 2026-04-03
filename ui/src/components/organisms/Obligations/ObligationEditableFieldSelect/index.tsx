'use client';
import { EditableFieldSelect } from '@/components/molecules/EditableFieldSelect';
import type { ObligationEditableFieldSelectProps } from '@/components/organisms/Obligations/ObligationEditableFieldSelect/types';
import { usePatchObligation } from '@/server/api/entity/obligation/queries';
import { type ObligationPatchDto, patchObligationSchema } from '@/server/api/entity/obligation/types';

export function ObligationEditableFieldSelect(props: ObligationEditableFieldSelectProps) {
  const { id, inlineLabel, ...rest } = props;
  if (!id) return null;
  const mutation = usePatchObligation(id);
  return (
    <EditableFieldSelect<ObligationPatchDto>
      validationSchema={patchObligationSchema}
      mutationHook={mutation}
      inlineLabel={inlineLabel}
      {...rest}
    />
  );
}
