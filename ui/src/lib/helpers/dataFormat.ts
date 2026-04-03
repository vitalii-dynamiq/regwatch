import { format, isValid, parseISO } from 'date-fns';

export type AppDateFormat = 'dot' | 'short' | 'withTime';

const formats: Record<AppDateFormat, string> = {
  dot: 'dd.MM.yyyy', // 24.10.2025
  short: 'MMM d, yyyy', // Jun 3, 2025
  withTime: 'dd MMM yyyy, HH:mm', // 11 Sep 2025, 14:54
};

export function dataFormat(value: unknown, type: AppDateFormat = 'short'): string | null {
  if (!value) return null;

  const date = parseISO(String(value));
  if (isValid(date)) {
    return format(date, formats[type]);
  }
  return null;
}
