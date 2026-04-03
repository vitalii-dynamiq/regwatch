import PAGINATION from '@/lib/constants/pagination';
import SORTING from '@/lib/constants/sorting';
import { makeMockObligation } from '@/lib/mocks/makeMockObligation';
import type { Obligations } from '@/server/api/entity/obligation/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(<string>searchParams.get(PAGINATION.PAGE_IDENTIFIER)) ?? PAGINATION.DEFAULT_PAGE;
  const pageSize = parseInt(<string>searchParams.get(PAGINATION.PAGE_SIZE_IDENTIFIER)) ?? PAGINATION.DEFAULT_PAGE_SIZE;
  const sortField = searchParams.get(SORTING.SORT_FIELD_IDENTIFIER) ?? 'title';
  const sortOrder = searchParams.get(SORTING.SORT_ORDER_IDENTIFIER) ?? SORTING.DEFAULT_SORT_DIRECTION;

  let items: Obligations = Array.from({ length: 1000 }, () => {
    return makeMockObligation();
  });

  items = items.sort((a, b) => {
    const aVal = a[sortField as keyof typeof a];
    const bVal = b[sortField as keyof typeof b];
    if (aVal === null) return 1;
    if (bVal === null) return -1;
    if (aVal < bVal) return sortOrder === SORTING.DEFAULT_SORT_DIRECTION ? -1 : 1;
    if (aVal > bVal) return sortOrder === SORTING.DEFAULT_SORT_DIRECTION ? 1 : -1;
    return 0;
  });

  const start = (page - 1) * pageSize;
  const paginatedItems = items.slice(start, start + pageSize);

  return Response.json({
    items: paginatedItems,
    total: items.length,
    page,
    pageSize,
    totalPages: Math.ceil(items.length / pageSize),
  });
}

export async function POST(request: Request) {
  const _data = await request.json();

  console.info({ _data });
  return Response.json(makeMockObligation());
}
