import type { FormFieldTextareaProps } from '@/components/molecules/FormFieldTextarea/types';
import type { UseMutationResult } from '@tanstack/react-query';
import type { FieldValues } from 'react-hook-form';
import type { z } from 'zod';

export type EditableFieldTextareaProps<TFieldValues extends FieldValues = FieldValues> =
  FormFieldTextareaProps<TFieldValues> & {
    validationSchema: z.ZodTypeAny;
    isEditing?: boolean;
    // Accept any TData and TError, but enforce variables to be TFieldValues
    mutationHook: UseMutationResult<unknown, unknown, TFieldValues, unknown>;
  };
