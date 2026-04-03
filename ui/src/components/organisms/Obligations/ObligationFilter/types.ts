import type { SearchParamsQuery } from '@/lib/constants/searchParams';

export type ObligationFilterProps = SearchParamsQuery & {
  excludeStatuses?: string[];
  fixedStatus?: string;
};
