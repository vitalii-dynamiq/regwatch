import type { FormFieldSelectProps } from '@/components/molecules/FormFieldSelect/types';
import type { UseMutationResult } from '@tanstack/react-query';
import React from 'react';
import type { FieldValues } from 'react-hook-form';
import type { z } from 'zod';

export type EditableFieldSelectProps<TFieldValues extends FieldValues = FieldValues> =
  FormFieldSelectProps<TFieldValues> & {
    validationSchema: z.ZodTypeAny;
    isEditing?: boolean;
    // Accept any TData and TError, but enforce variables to be TFieldValues
    mutationHook: UseMutationResult<unknown, unknown, TFieldValues, unknown>;
    inlineLabel?: boolean;
    className?: string;
    children: React.ReactNode;
  };
