'use client';
import { EditableFieldTextarea } from '@/components/molecules/EditableFieldTextarea';
import type { AlertEditableFieldTextareaRegulatoryMetadataProps } from '@/components/organisms/Alerts/AlertEditableFieldTextareaRegulatoryMetadata/types';
import { usePatchAlertRegulatoryMetaData } from '@/server/api/entity/alert/queries';
import { type AlertPatchDto, patchAlertSchema } from '@/server/api/entity/alert/types';

export function AlertEditableFieldTextareaRegulatoryMetadata(props: AlertEditableFieldTextareaRegulatoryMetadataProps) {
  const { id, ...rest } = props;
  if (!id) return null;
  const mutation = usePatchAlertRegulatoryMetaData(id);
  return <EditableFieldTextarea<AlertPatchDto> validationSchema={patchAlertSchema} mutationHook={mutation} {...rest} />;
}
