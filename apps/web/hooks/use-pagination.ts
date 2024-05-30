import { useCallback } from "react";

import type { Pagination } from "@/types";

interface UsePaginationProps {
  totalRows: number;
  skip: number;
  limit: number;
  onPaginationChange?: (pagination: Pagination) => void;
}

export function usePagination({
  skip,
  limit,
  totalRows,
  onPaginationChange,
}: UsePaginationProps) {
  const totalPage = Math.ceil(Number(totalRows) / Number(limit));
  const activePageIndex = Math.floor(skip / limit);

  const onChangePage = useCallback(
    (value: number) => {
      onPaginationChange?.({ limit, skip: value * limit });
    },
    [limit, onPaginationChange]
  );

  return {
    totalPage,
    activePageIndex,
    onChangePage,
    limit,
  };
}
