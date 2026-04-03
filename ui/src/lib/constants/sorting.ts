const SORTING = {
  SORT_DIRECTIONS: ['asc', 'desc'] as const,
  DEFAULT_SORT_DIRECTION: 'asc',
  SORT_FIELD_IDENTIFIER: 'order_by',
  SORT_ORDER_IDENTIFIER: 'sortOrder',
} as const;

export type SortDirection = (typeof SORTING)['SORT_DIRECTIONS'][number];
export type SortField = typeof SORTING.SORT_FIELD_IDENTIFIER;

export default SORTING;
