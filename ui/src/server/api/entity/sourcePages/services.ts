import Repository from '@/server/api/entity/sourcePages/repository';
import {
  type SourcePage,
  type SourcePageCreateDto,
  type SourcePagePatchDto,
  type SourcePageUpdateDto,
  sourcePageArraySchema,
  sourcePagePaginationSchema,
  sourcePageSchema,
} from '@/server/api/entity/sourcePages/types';

import { factoryCrudService } from '@/server/api/_shared/factoryCrudService';

const repo = new Repository();

export const sourcePageService = factoryCrudService<
  SourcePage,
  SourcePageCreateDto,
  SourcePageUpdateDto,
  SourcePagePatchDto
>({
  repo,
  schemas: {
    list: sourcePageArraySchema,
    pagination: sourcePagePaginationSchema,
    item: sourcePageSchema,
  },
});
export const fetchPaginationSourcePages = sourcePageService.fetchAllWithPagination;
