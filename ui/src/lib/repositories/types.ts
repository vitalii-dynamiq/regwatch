import type { PaginationResponse } from '@/components/molecules/Pagination/types';
import type { SearchParamsQuery } from '@/lib/constants/searchParams';
import type { Id } from '@/lib/zod';

export interface Repository<T, TCreateDto, TUpdateDto, TPatchOptionsDto> {
  create(dto: TCreateDto): Promise<T>;

  update(id: Id, dto: TUpdateDto): Promise<T>;

  patchOptions(id: Id, dto: TPatchOptionsDto): Promise<T>;

  patch(id: Id, dto: TPatchOptionsDto): Promise<T>;

  getOne(id: Id): Promise<T>;

  getAll(): Promise<T[]>;

  getAllWithPagination(params: SearchParamsQuery): Promise<PaginationResponse<T>>;

  delete(id: Id): Promise<boolean>;

  duplicate(id: Id): Promise<boolean>;
}
