const PAGINATION = {
  PAGE_IDENTIFIER: 'page',
  PAGE_SIZE_IDENTIFIER: 'size',
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZES: [10, 25, 50],
  DEFAULT_PAGE_WITH_COUNT: true,
} as const;

export type PaginationPageSizes = (typeof PAGINATION)['PAGE_SIZES'][number];

export default PAGINATION;
