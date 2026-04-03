import type { Control, ControllerRenderProps, FieldPath, FieldPathValue, FieldValues } from 'react-hook-form';

export type FormFieldProps<TFieldValues extends FieldValues = FieldValues> = {
  control?: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: React.ReactNode | string;
  description?: React.ReactNode | string;
  descriptionPosition?: 'above' | 'below';
  defaultValue?: FieldPathValue<TFieldValues, FieldPath<TFieldValues>> | null;
  renderAction: (args: { field: ControllerRenderProps<TFieldValues, FieldPath<TFieldValues>> }) => React.ReactNode;
  inlineLabel?: boolean;
};
