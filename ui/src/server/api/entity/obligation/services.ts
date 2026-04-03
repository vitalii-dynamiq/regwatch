import Repository from '@/server/api/entity/obligation/repository';
import {
  type Obligation,
  type ObligationBulkDeleteDto,
  type ObligationCreateDto,
  type ObligationPatchDto,
  type ObligationUpdateDto,
  bulkDeleteObligationSchema,
  createObligationSchema,
  obligationArraySchema,
  obligationPaginationSchema,
  obligationSchema,
  patchObligationSchema,
} from '@/server/api/entity/obligation/types';

import { idValidationSchema } from '@/lib/zod';
import { factoryCrudService } from '@/server/api/_shared/factoryCrudService';

const repo = new Repository();

export const obligationService = factoryCrudService<
  Obligation,
  ObligationCreateDto,
  ObligationUpdateDto,
  ObligationPatchDto
>({
  repo,
  schemas: {
    list: obligationArraySchema,
    pagination: obligationPaginationSchema,
    item: obligationSchema,
    create: createObligationSchema,
    patch: patchObligationSchema,
  },
});

export const fetchPaginationObligations = obligationService.fetchAllWithPagination;
export const fetchObligationById = obligationService.fetchById;
export const createObligation = obligationService.create;
export const patchObligation = obligationService.patch;
export const deleteObligation = obligationService.delete;
export const bulkDeleteObligation = async (input: ObligationBulkDeleteDto) => {
  if (!bulkDeleteObligationSchema) return input as unknown as ObligationBulkDeleteDto;
  const validIds = input.ids.map((id) => idValidationSchema.parse({ id }).id);
  const dto = bulkDeleteObligationSchema.parse({ ids: validIds });
  return await repo.bulkDelete(dto);
};
