import Repository from '@/server/api/entity/alert/repository';
import {
  type Alert,
  type AlertBulkDeleteDto,
  type AlertPatchDto,
  alertArraySchema,
  alertPaginationSchema,
  alertSchema,
  bulkDeleteAlertSchema,
  patchAlertSchema,
} from '@/server/api/entity/alert/types';

import { idValidationSchema } from '@/lib/zod';
import { factoryCrudService } from '@/server/api/_shared/factoryCrudService';

const repo = new Repository();

export const alertService = factoryCrudService<Alert, {}, {}, AlertPatchDto>({
  repo,
  schemas: {
    list: alertArraySchema,
    pagination: alertPaginationSchema,
    item: alertSchema,
    patch: patchAlertSchema,
  },
});

export const fetchPaginationAlerts = alertService.fetchAllWithPagination;
export const fetchAlertById = alertService.fetchById;
export const patchAlert = alertService.patch;
export const deleteAlert = alertService.delete;

export const bulkDeleteAlert = async (input: AlertBulkDeleteDto) => {
  if (!bulkDeleteAlertSchema) return input as unknown as AlertBulkDeleteDto;
  const validIds = input.ids.map((id) => idValidationSchema.parse({ id }).id);
  const dto = bulkDeleteAlertSchema.parse({ ids: validIds });
  return await repo.bulkDelete(dto);
};
