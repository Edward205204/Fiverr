import { useState } from 'react';

export function useScrollWindow<T>(items: T[], visibleCount: number) {
  const [startIndex, setStartIndex] = useState(0);

  const endIndex = startIndex + visibleCount;
  const maxStart = Math.max(0, items.length - visibleCount);

  const canScrollLeft = startIndex > 0;
  const canScrollRight = endIndex < items.length;

  const scrollLeft = () => {
    if (canScrollLeft) {
      setStartIndex((prev) => Math.max(0, prev - 1));
    }
  };

  const scrollRight = () => {
    if (canScrollRight) {
      setStartIndex((prev) => Math.min(maxStart, prev + 1));
    }
  };

  const visibleItems = items.slice(startIndex, endIndex);

  return {
    visibleItems,
    canScrollLeft,
    canScrollRight,
    scrollLeft,
    scrollRight
  };
}
