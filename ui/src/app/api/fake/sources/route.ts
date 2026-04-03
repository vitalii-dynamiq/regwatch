import PAGINATION from '@/lib/constants/pagination';
import SORTING from '@/lib/constants/sorting';
import { makeMockSource } from '@/lib/mocks/makeMockSource';
import type { Sources } from '@/server/api/entity/source/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const pageParam = searchParams.get(PAGINATION.PAGE_IDENTIFIER);
  const parsedPage = Number(pageParam);
  const page = Number.isFinite(parsedPage) && parsedPage >= 1 ? parsedPage : PAGINATION.DEFAULT_PAGE;

  const pageSizeParam = searchParams.get(PAGINATION.PAGE_SIZE_IDENTIFIER);
  const parsedPageSize = Number(pageSizeParam);
  const pageSize =
    Number.isFinite(parsedPageSize) && parsedPageSize >= 1 ? parsedPageSize : PAGINATION.DEFAULT_PAGE_SIZE;

  const sortField = searchParams.get(SORTING.SORT_FIELD_IDENTIFIER) ?? 'regulatorySource';
  const sortOrderRaw = searchParams.get(SORTING.SORT_ORDER_IDENTIFIER) ?? SORTING.DEFAULT_SORT_DIRECTION;
  const dir = String(sortOrderRaw).toLowerCase() === String(SORTING.DEFAULT_SORT_DIRECTION).toLowerCase() ? 1 : -1;

  let items: Sources = Array.from({ length: 1000 }, (_, _index) => {
    return makeMockSource();
  });

  const compareValues = (aVal: unknown, bVal: unknown): number => {
    // Nullish handling: push null/undefined to the end
    const aNullish = aVal == null;
    const bNullish = bVal == null;
    if (aNullish && bNullish) return 0;
    if (aNullish) return 1;
    if (bNullish) return -1;

    // Numbers (or numeric strings)
    const aNum = typeof aVal === 'number' ? aVal : typeof aVal === 'string' ? Number(aVal) : NaN;
    const bNum = typeof bVal === 'number' ? bVal : typeof bVal === 'string' ? Number(bVal) : NaN;
    const bothNumeric = Number.isFinite(aNum) && Number.isFinite(bNum);
    if (bothNumeric) {
      if (aNum < bNum) return -1;
      if (aNum > bNum) return 1;
      return 0;
    }

    // Dates (ISO or parseable)
    const aTime = typeof aVal === 'string' ? Date.parse(aVal) : NaN;
    const bTime = typeof bVal === 'string' ? Date.parse(bVal) : NaN;
    const bothDates = Number.isFinite(aTime) && Number.isFinite(bTime);
    if (bothDates) {
      if (aTime < bTime) return -1;
      if (aTime > bTime) return 1;
      return 0;
    }

    // Fallback to string comparison
    const aStr = String(aVal);
    const bStr = String(bVal);
    return aStr.localeCompare(bStr, undefined, { numeric: true, sensitivity: 'base' });
  };

  items = items.sort((a, b) => {
    const aVal = a[sortField as keyof typeof a];
    const bVal = b[sortField as keyof typeof b];
    const base = compareValues(aVal, bVal);
    return dir * base;
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

export async function POST(_request: Request) {
  return Response.json({ message: 'Hello World' });
}
