import type { SearchParamsQuery } from '@/lib/constants/searchParams';

export type SourceFilterSearchProps = SearchParamsQuery & {
  excludeStatuses?: string[];
  fixedStatus?: string;
};
