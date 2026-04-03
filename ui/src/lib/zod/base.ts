import { z } from 'zod';

export const idStringSchema = z
  .string({
    required_error: 'Invalid ID',
    invalid_type_error: 'Invalid ID',
  })
  .trim()
  .regex(/^(?!-+$)[A-Za-z0-9](?:[A-Za-z0-9-_]*[A-Za-z0-9])?$/, 'Invalid ID')
  .min(1, 'Invalid ID');

export const idNumberSchema = z
  .number({
    required_error: 'Invalid ID',
    invalid_type_error: 'Invalid ID',
  })
  .int({ message: 'Invalid ID' })
  .positive({ message: `Invalid ID` })
  .max(Number.MAX_SAFE_INTEGER, { message: 'Invalid ID' });

export const uuIdSchema = z
  .string({
    required_error: 'Invalid ID',
    invalid_type_error: 'Invalid ID',
  })
  .trim()
  .uuid({ message: 'Invalid ID' });

export const idSchema = z.union([idStringSchema, idNumberSchema, uuIdSchema], {
  message: `Invalid ID`,
});

export const makeRequiredString = (label = 'Field') =>
  z
    .string({
      required_error: `${label} is required`,
      invalid_type_error: `${label} is required`,
    })
    .trim()
    .min(1, { message: `${label} is required` });

export const makeOptionalString = (label = 'Field') =>
  z
    .string({ invalid_type_error: `${label} must be a string` })
    .trim()
    .optional()
    .transform((val) => (val === '' ? undefined : val));

export const makeRequiredBoolean = (label = 'Flag') => z.boolean({ required_error: `${label} is required` });

export const makeNullableString = () => z.string().trim().nullable();

export const datetimeSchema = z.string().trim().datetime({ message: 'Invalid datetime' });

export const idValidationSchema = z.object({
  id: idSchema,
});
