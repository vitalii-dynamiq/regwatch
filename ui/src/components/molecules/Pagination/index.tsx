import PaginationLink from '@/components/atoms/PaginationLink';
import PaginationNext from '@/components/molecules/PaginationNext';
import PaginationPrevious from '@/components/molecules/PaginationPrevious';
import { PaginationContent, PaginationEllipsis, PaginationItem, Pagination as UIPagination } from '@/ui/pagination';

import type { PaginationProps } from '@/components/molecules/Pagination/types';
import PAGINATION from '@/lib/constants/pagination';
import { buildUrlQueryParams } from '@/lib/helpers/buildUrlQueryParams';

const siblingCount = 1; // number of pages to show on each side of the current page
const boundaryCount = 1; // number of pages to always show at the boundaries

function range(start: number, end: number) {
  const out: number[] = [];
  for (let i = start; i <= end; i++) out.push(i);
  return out;
}

// Returns an array of page numbers and '...' tokens to render
function getPageRange(totalPages: number, currentPage: number) {
  if (totalPages <= 1) return [1];
  const startPages = range(1, Math.min(boundaryCount, totalPages));
  const endPages = range(Math.max(totalPages - boundaryCount + 1, boundaryCount + 1), totalPages);

  const siblingsStart = Math.max(
    Math.min(currentPage - siblingCount, totalPages - boundaryCount - siblingCount * 2 - 1),
    boundaryCount + 2
  );
  const siblingsEnd = Math.min(
    Math.max(currentPage + siblingCount, boundaryCount + siblingCount * 2 + 2),
    endPages[0] != null ? Math.max(1, Math.min(endPages[0] - 2, totalPages - 1)) : Math.max(1, totalPages - 1)
  );

  const pages: Array<number | '...'> = [...startPages];

  if (siblingsStart > boundaryCount + 2) {
    pages.push('...');
  } else if (boundaryCount + 1 < totalPages - boundaryCount) {
    pages.push(boundaryCount + 1);
  }

  pages.push(...range(siblingsStart, siblingsEnd));

  if (siblingsEnd < totalPages - boundaryCount - 1) {
    pages.push('...');
  } else if (totalPages - boundaryCount > boundaryCount) {
    pages.push(totalPages - boundaryCount);
  }

  pages.push(...endPages);
  return pages;
}

export function Pagination<T>({ pagination, href, searchParams, className }: PaginationProps<T>) {
  if (!pagination) return null;
  const { page: currentPage, totalPages } = pagination;

  if (totalPages === null || totalPages === undefined || isNaN(totalPages) || 1 >= totalPages) return null;

  const defaultPage = PAGINATION.DEFAULT_PAGE;

  const prevPage = Math.max(defaultPage, Number(currentPage) - 1);
  const nextPage = Math.min(Number(totalPages), Number(currentPage) + 1);
  const pagesToRender = getPageRange(Number(totalPages), Number(currentPage));

  return (
    <UIPagination className={className}>
      <PaginationContent>
        {Number(currentPage) > defaultPage && (
          <PaginationItem>
            <PaginationPrevious
              href={buildUrlQueryParams(href, {
                ...searchParams,
                page: prevPage,
              })}
            />
          </PaginationItem>
        )}

        {pagesToRender.map((token, idx) =>
          token === '...' ? (
            <PaginationItem key={`ellipsis-${idx}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={`page-${token}`}>
              <PaginationLink
                href={buildUrlQueryParams(href, {
                  ...searchParams,
                  page: Number(token),
                })}
                isActive={currentPage === token}
              >
                {token}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        {Number(currentPage) < Number(totalPages) && (
          <PaginationItem>
            <PaginationNext
              href={buildUrlQueryParams(href, {
                ...searchParams,
                page: nextPage,
              })}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </UIPagination>
  );
}
