import { useMemo } from 'react';

const usePagination = ({
  itemsCount,
  pageSize,
  currentPage,
  siblingCount = 1,
}) => {
  const totalPageCount = Math.ceil(itemsCount / pageSize);
  const totalPageNumbers = siblingCount + 5;

  const range = (start, end) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };

  const paginationItems = useMemo(() => {
    if (totalPageNumbers > totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );
    const showLeftDots = leftSiblingIndex > 3;
    const showRightDots = rightSiblingIndex <= totalPageCount - 2;

    if (!showLeftDots && showRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);
      return [...leftRange, '...', totalPageCount];
    }

    if (showLeftDots && showRightDots) {
      let midRange = range(leftSiblingIndex, rightSiblingIndex);
      return [1, '...', ...midRange, '...', totalPageCount];
    }

    if (showLeftDots && !showRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [1, '...', ...rightRange];
    }

  }, [currentPage, siblingCount, totalPageCount, totalPageNumbers]);

  return { paginationItems, totalPageCount };
};

export default usePagination;
