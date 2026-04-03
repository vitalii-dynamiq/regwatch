import type { PaginationResponse } from '@/components/molecules/Pagination/types';
import PAGINATION from '@/lib/constants/pagination';
import type { SearchParamsQuery } from '@/lib/constants/searchParams';
import type { Repository } from '@/lib/repositories/types';
import { type Id, type Pagination, idValidationSchema } from '@/lib/zod';
import type { z } from 'zod';

export function factoryCrudService<T, TCreateDto, TUpdateDto, TPatchDto, TListItem = T>(params: {
  repo: Repository<T, TCreateDto, TUpdateDto, TPatchDto>;
  schemas: {
    list: z.ZodType<TListItem[]>;
    pagination?: z.ZodType<
      Pagination & {
        items: TListItem[];
      }
    >;
    item: z.ZodType<T>;
    create?: z.ZodType<TCreateDto>;
    update?: z.ZodType<TUpdateDto>;
    patch?: z.ZodType<TPatchDto>;
  };
}) {
  const { repo, schemas } = params;

  return {
    fetchAll: async (): Promise<TListItem[]> => {
      const data = await repo.getAll();
      return schemas.list.parse(data);
    },
    fetchAllWithPagination: async ({
      pageSize = PAGINATION.DEFAULT_PAGE_SIZE,
      page = PAGINATION.DEFAULT_PAGE,
      ...rest
    }: SearchParamsQuery): Promise<PaginationResponse<TListItem>> => {
      const data = await repo.getAllWithPagination({
        pageSize,
        page,
        ...rest,
      } as SearchParamsQuery);

      const { pagination } = schemas;
      if (!pagination) {
        throw new Error('Pagination schema is not defined for this service.');
      }

      try {
        return pagination.parse(data);
      } catch (error) {
        // todo: add error handling and return errors paths
        console.error(`Error parsing pagination data: ${error instanceof Error ? error.message : String(error)}`);
        throw new Error(`Error parsing pagination data: ${error instanceof Error ? error.message : String(error)}`);
      }
    },
    fetchById: async (id: Id): Promise<T> => {
      const data = await repo.getOne(id);
      return schemas.item.parse(data);
    },
    create: async (input: TCreateDto): Promise<T> => {
      if (!schemas.create) return input as unknown as T;
      const dto = schemas.create.parse(input);
      const data = await repo.create(dto);
      return schemas.item.parse(data);
    },
    update: async (id: Id, input: TUpdateDto): Promise<T> => {
      if (!schemas.update) return input as unknown as T;
      const { id: validId } = idValidationSchema.parse({ id });
      const dto = schemas.update.parse(input);
      const data = await repo.update(validId, dto);
      return schemas.item.parse(data);
    },
    patch: async (id: Id, input: TPatchDto): Promise<T> => {
      if (!schemas.patch) return input as unknown as T;
      const { id: validId } = idValidationSchema.parse({ id });
      const dto = schemas.patch.parse(input);
      const data = await repo.patch(validId, dto);
      return schemas.item.parse(data);
    },
    delete: async (id: Id): Promise<boolean> => {
      const { id: validId } = idValidationSchema.parse({ id });
      return repo.delete(validId);
    },
  };
}
