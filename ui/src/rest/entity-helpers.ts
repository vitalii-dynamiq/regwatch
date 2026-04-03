import { QueryClient } from '@tanstack/react-query';

export function entityKey(entity: string, id: string | number) {
  return [entity, 'by-id', String(id)];
}

export function upsertEntities<T extends { id: string | number }>(
  qc: QueryClient,
  entityName: string,
  items: T[]
): void {
  for (const item of items) {
    const key = entityKey(entityName, item.id);
    const copy = typeof structuredClone === 'function' ? structuredClone(item) : JSON.parse(JSON.stringify(item));
    qc.setQueryData<T>(key, (prev) => ({ ...(prev ?? ({} as T)), ...copy }));
  }
}
