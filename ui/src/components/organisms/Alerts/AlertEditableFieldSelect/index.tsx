'use client';
import { EditableFieldSelect } from '@/components/molecules/EditableFieldSelect';
import type { AlertEditableFieldSelectProps } from '@/components/organisms/Alerts/AlertEditableFieldSelect/types';
import { usePatchAlert } from '@/server/api/entity/alert/queries';
import { type AlertPatchDto, patchAlertSchema } from '@/server/api/entity/alert/types';

export function AlertEditableFieldSelect(props: AlertEditableFieldSelectProps) {
  const { id, inlineLabel, ...rest } = props;
  if (!id) return null;
  const mutation = usePatchAlert(id);
  return (
    <EditableFieldSelect<AlertPatchDto>
      validationSchema={patchAlertSchema}
      mutationHook={mutation}
      inlineLabel={inlineLabel}
      {...rest}
    />
  );
}
