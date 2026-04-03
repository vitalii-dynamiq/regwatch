'use client';
import { EditableFieldTextarea } from '@/components/molecules/EditableFieldTextarea';
import type { ObligationEditableTextareaRegulatoryMetadataProps } from '@/components/organisms/Obligations/ObligationEditableTextareaRegulatoryMetadata/types';
import { usePatchObligationRegulatoryMetaData } from '@/server/api/entity/obligation/queries';
import { type ObligationPatchDto, patchObligationSchema } from '@/server/api/entity/obligation/types';

export function ObligationEditableTextareaRegulatoryMetadata(props: ObligationEditableTextareaRegulatoryMetadataProps) {
  const { id, ...rest } = props;
  if (!id) return null;
  const mutation = usePatchObligationRegulatoryMetaData(id);
  return (
    <EditableFieldTextarea<ObligationPatchDto>
      validationSchema={patchObligationSchema}
      mutationHook={mutation}
      {...rest}
    />
  );
}
