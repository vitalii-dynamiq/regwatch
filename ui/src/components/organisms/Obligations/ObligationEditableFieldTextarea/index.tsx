'use client';
import { EditableFieldTextarea } from '@/components/molecules/EditableFieldTextarea';
import type { ObligationEditableFieldTextareaProps } from '@/components/organisms/Obligations/ObligationEditableFieldTextarea/types';
import { usePatchObligation } from '@/server/api/entity/obligation/queries';
import { type ObligationPatchDto, patchObligationSchema } from '@/server/api/entity/obligation/types';

export function ObligationEditableFieldTextarea(props: ObligationEditableFieldTextareaProps) {
  const { id, ...rest } = props;
  if (!id) return null;
  const mutation = usePatchObligation(id);
  return (
    <EditableFieldTextarea<ObligationPatchDto>
      validationSchema={patchObligationSchema}
      mutationHook={mutation}
      {...rest}
    />
  );
}
