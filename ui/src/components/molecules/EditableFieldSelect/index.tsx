'use client';

import Button from '@/components/atoms/Button';
import type { EditableFieldSelectProps } from '@/components/molecules/EditableFieldSelect/types';
import { FormFieldReadOnly } from '@/components/molecules/FormFieldReadOnly';
import { FormFieldSelect } from '@/components/molecules/FormFieldSelect';
import { Form } from '@/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { type DefaultValues, type FieldValues, useForm } from 'react-hook-form';

export function EditableFieldSelect<T extends FieldValues>({
  label,
  description,
  defaultValue,
  name: fieldName,
  placeholder,
  validationSchema,
  isEditing = false,
  mutationHook,
  children,
  options,
  inlineLabel,
  className,
}: EditableFieldSelectProps<T>) {
  const [isEditable, setIsEditable] = useState<boolean>(isEditing);

  const { mutate, isPending } = mutationHook;

  const form = useForm<T>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      [fieldName]: defaultValue as T[typeof fieldName],
    } as DefaultValues<T>,
  });

  useEffect(() => {
    const next = {
      ...form.getValues(),
      [fieldName]: defaultValue,
    } as DefaultValues<T>;
    form.reset(next, { keepDefaultValues: true });
  }, [defaultValue, fieldName, form]);

  const onSubmit = useCallback(
    (values: T) => {
      mutate(values, {
        onSuccess: () => {
          setIsEditable(false);
        },
      });
    },
    [mutate]
  );

  const handleEdit = useCallback(
    (editable: boolean) => {
      setIsEditable(editable);
      const next = {
        ...form.getValues(),
        [fieldName]: defaultValue,
      } as DefaultValues<T>;
      form.reset(next, { keepDefaultValues: true });
    },
    [form, fieldName, defaultValue]
  );

  if (isEditable) {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex gap-2 flex-col md:flex-row'>
          <FormFieldSelect
            label={label}
            name={fieldName}
            placeholder={placeholder}
            description={description}
            control={form.control}
            disabled={isPending}
            options={options}
            inlineLabel={inlineLabel}
            className={className}
          />
          <div className='flex justify-end gap-2'>
            <Button variant='outline' disabled={isPending} onClick={() => handleEdit(false)}>
              Cancel
            </Button>
            <Button type='submit' disabled={isPending}>
              Save
            </Button>
          </div>
        </form>
      </Form>
    );
  }

  return (
    <FormFieldReadOnly label={label} defaultValue={children} description={description}>
      <Button
        className='cursor-pointer text-foreground'
        aria-label='Edit field'
        variant='ghost'
        size='sm'
        onClick={() => handleEdit(true)}
      >
        <Pencil className='h-4 w-4' />
      </Button>
    </FormFieldReadOnly>
  );
}
