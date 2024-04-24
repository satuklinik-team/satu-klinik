import {
  Pagination as UIPagination,
  PaginationButton,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  onChange?: (current: number) => unknown;
  pageIndex: number;
  pageCount: number;
  isCanPreviousPage: boolean;
  isCanNextPage: boolean;
}

export function Pagination({
  isCanNextPage,
  isCanPreviousPage,
  pageIndex,
  pageCount,
  onChange,
}: PaginationProps): React.JSX.Element {
  return (
    <UIPagination className="flex items-center justify-end space-x-2 py-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={!isCanPreviousPage}
            onClick={() => {
              onChange?.(pageIndex - 1);
            }}
          />
        </PaginationItem>
        {Array.from({ length: pageCount }, (_, index) => {
          const MAX_DISPLAY_PAGES = 3;
          const currentPageIndex = pageIndex;

          const isWithinRange =
            index < MAX_DISPLAY_PAGES ||
            (index >= currentPageIndex - 1 && index <= currentPageIndex + 1);

          const isEllipsisPosition =
            index === MAX_DISPLAY_PAGES ||
            index === currentPageIndex - 2 ||
            index === currentPageIndex + 2;

          if (isWithinRange) {
            return (
              <PaginationItem key={index}>
                <PaginationButton
                  isActive={currentPageIndex === index}
                  onClick={() => onChange?.(index)}
                >
                  {index + 1}
                </PaginationButton>
              </PaginationItem>
            );
          }

          if (isEllipsisPosition) {
            return (
              <PaginationItem key={index}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return null;
        })}
        <PaginationItem>
          <PaginationNext
            disabled={!isCanNextPage}
            onClick={() => {
              onChange?.(pageIndex + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </UIPagination>
  );
}
