'use client';

import { EditableFieldDatepicker } from '@/components/molecules/EditableFieldDatepicker';
import type { ObligationEditableFieldDatepickerProps } from '@/components/organisms/Obligations/ObligationEditableFieldDatepicker/types';
import { usePatchObligation } from '@/server/api/entity/obligation/queries';
import { type ObligationPatchDto, patchObligationSchema } from '@/server/api/entity/obligation/types';

export function ObligationEditableFieldDatepicker(props: ObligationEditableFieldDatepickerProps) {
  const { id, inlineLabel, ...rest } = props;
  if (!id) return null;

  const mutation = usePatchObligation(id);

  return (
    <EditableFieldDatepicker<ObligationPatchDto>
      validationSchema={patchObligationSchema}
      mutationHook={mutation}
      inlineLabel={inlineLabel}
      {...rest}
    />
  );
}
