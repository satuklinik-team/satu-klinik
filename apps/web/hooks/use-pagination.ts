import { useCallback, useState } from "react";

interface UsePaginationProps {
  totalRows: number;
  skip: number;
  limit: number;
}

export function usePagination({ skip, limit, totalRows }: UsePaginationProps) {
  const [currentSkip, setCurrentSkip] = useState<number>(skip);

  const totalPage = Math.ceil(Number(totalRows) / Number(limit));
  const activePageIndex = Math.floor(currentSkip / limit);

  const onChangePage = useCallback(
    (value: number) => {
      setCurrentSkip(value * limit);
    },
    [limit],
  );

  return {
    totalPage,
    activePageIndex,
    currentSkip,
    setCurrentSkip,
    onChangePage,
    limit,
  };
}
