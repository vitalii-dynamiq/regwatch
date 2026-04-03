import Repository from '@/server/api/entity/source/repository';
import {
  type Source,
  type SourceBulkDeleteDto,
  type SourceBulkPatchDto,
  type SourceCreateDto,
  type SourceListItem,
  type SourcePatchDto,
  type SourceUpdateDto,
  bulkDeleteSourceSchema,
  bulkPatchSourceSchema,
  createSourceSchema,
  patchSourceSchema,
  sourceArraySchema,
  sourcePaginationSchema,
  sourceSchema,
} from '@/server/api/entity/source/types';

import { idValidationSchema } from '@/lib/zod';
import { factoryCrudService } from '@/server/api/_shared/factoryCrudService';

const repo = new Repository();

export const sourceService = factoryCrudService<
  Source,
  SourceCreateDto,
  SourceUpdateDto,
  SourcePatchDto,
  SourceListItem
>({
  repo,
  schemas: {
    list: sourceArraySchema,
    pagination: sourcePaginationSchema,
    item: sourceSchema,
    create: createSourceSchema,
    patch: patchSourceSchema,
  },
});

export const fetchPaginationSources = sourceService.fetchAllWithPagination;
export const fetchSourceById = sourceService.fetchById;
export const createSource = sourceService.create;
export const patchSource = sourceService.patch;
export const deleteSource = sourceService.delete;

export const bulkPatchSource = async (input: SourceBulkPatchDto) => {
  if (!bulkPatchSourceSchema) return input as unknown as SourceBulkPatchDto;
  const validIds = input.ids.map((id) => idValidationSchema.parse({ id }).id);
  const dto = bulkPatchSourceSchema.parse({ ...input, ids: validIds });
  return await repo.bulkPatch(dto);
};

export const bulkDeleteSource = async (input: SourceBulkDeleteDto) => {
  if (!bulkDeleteSourceSchema) return input as unknown as SourceBulkDeleteDto;
  const validIds = input.ids.map((id) => idValidationSchema.parse({ id }).id);
  const dto = bulkDeleteSourceSchema.parse({ ids: validIds });
  return await repo.bulkDelete(dto);
};
