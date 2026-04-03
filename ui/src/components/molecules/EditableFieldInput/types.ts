import type { FormFieldInputProps } from '@/components/molecules/FormFieldInput/types';
import type { UseMutationResult } from '@tanstack/react-query';
import type { FieldValues } from 'react-hook-form';
import type { z } from 'zod';

export type EditableFieldInputProps<TFieldValues extends FieldValues = FieldValues> =
  FormFieldInputProps<TFieldValues> & {
    validationSchema: z.ZodTypeAny;
    isEditing?: boolean;
    mutationHook: UseMutationResult<unknown, unknown, TFieldValues, unknown>;
  };
