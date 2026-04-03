import { z } from 'zod';

export const makeEmailSchema = (label = 'Email') =>
  z
    .string()
    .trim()
    .min(1, { message: `${label} is required` })
    .max(320, { message: `${label} is too long` })
    .email({ message: `Invalid ${label.toLowerCase()} address` });

export const makeUrlSchema = (label = 'URL') =>
  z
    .string()
    .trim()
    .min(1, { message: `${label} is required` })
    .max(2083, { message: `${label} is too long` })
    .url({ message: `Invalid ${label.toLowerCase()}` });

export const makePasswordSchema = (label = 'Password') =>
  z
    .string()
    .trim()
    .min(8, { message: `${label} must be at least 8 characters` });
