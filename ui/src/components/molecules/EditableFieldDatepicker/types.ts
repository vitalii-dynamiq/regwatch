import type { FormFieldDatepickerProps } from '@/components/molecules/FormFieldDatepicker/types';
import type { UseMutationResult } from '@tanstack/react-query';
import type { FieldValues } from 'react-hook-form';
import type { z } from 'zod';

export type EditableFieldDatepickerProps<TFieldValues extends FieldValues = FieldValues> =
  FormFieldDatepickerProps<TFieldValues> & {
    validationSchema: z.ZodTypeAny;
    isEditing?: boolean;
    mutationHook: UseMutationResult<unknown, unknown, TFieldValues, unknown>;
    inlineLabel?: boolean;
  };
