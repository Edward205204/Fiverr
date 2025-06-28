import { useSearchParams } from 'react-router';

interface UsePaginationProps {
  totalRows: number;
  pageSize: number;
  pageIndex: number;
}

interface UsePaginationReturn {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
  handlePageSizeChange: (size: number) => void;
  showingInfo: {
    start: number;
    end: number;
    total: number;
  };
}

export function usePagination({ totalRows, pageSize, pageIndex }: UsePaginationProps): UsePaginationReturn {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = pageIndex;
  const totalPages = Math.ceil(totalRows / pageSize);

  const handlePageChange = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('pageIndex', page.toString());
    setSearchParams(newSearchParams);
  };

  const handlePageSizeChange = (size: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('pageSize', size.toString());
    newSearchParams.set('pageIndex', '1');
    setSearchParams(newSearchParams);
  };

  const showingInfo = {
    start: (currentPage - 1) * pageSize + 1,
    end: Math.min(currentPage * pageSize, totalRows),
    total: totalRows
  };

  return {
    currentPage,
    totalPages,
    handlePageChange,
    handlePageSizeChange,
    showingInfo
  };
}
