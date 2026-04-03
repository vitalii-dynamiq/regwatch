'use client';
import Button from '@/components/atoms/Button';
import type { EditableFieldInputProps } from '@/components/molecules/EditableFieldInput/types';
import { FormFieldInput } from '@/components/molecules/FormFieldInput';
import { FormFieldReadOnly } from '@/components/molecules/FormFieldReadOnly';
import { Form } from '@/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil } from 'lucide-react';
import { useCallback, useState } from 'react';
import { type DefaultValues, type FieldValues, useForm } from 'react-hook-form';

export function EditableFieldInput<T extends FieldValues>({
  label,
  description,
  defaultValue,
  name: fieldName,
  placeholder,
  validationSchema,
  isEditing = false,
  mutationHook,
}: EditableFieldInputProps<T>) {
  const [isEditable, setIsEditable] = useState<boolean>(isEditing);

  const { mutate, isPending } = mutationHook;

  const form = useForm<T>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      [fieldName]: defaultValue as T[typeof fieldName],
    } as DefaultValues<T>,
  });

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
      form.reset();
    },
    [form]
  );

  if (isEditable) {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='gap-2 flex'>
          <FormFieldInput
            label={label}
            name={fieldName}
            placeholder={placeholder}
            description={description}
            control={form.control}
            disabled={isPending}
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
    <FormFieldReadOnly label={label} defaultValue={defaultValue} valuePosition='below' description={description}>
      <Button
        className='text-foreground cursor-pointer hover:bg-white'
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
