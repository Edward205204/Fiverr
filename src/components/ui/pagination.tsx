import { Button } from '@/components/ui/button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({ currentPage, totalPages, onPageChange, className = '' }: PaginationProps) {
  // Tạo pagination items theo logic phức tạp
  const generatePaginationItems = () => {
    const items = [];
    const range = 2;

    if (totalPages <= 7) {
      // Nếu tổng số trang <= 7, hiển thị tất cả
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      // Luôn hiển thị trang đầu
      items.push(1);

      // Tính toán range xung quanh current page
      const startRange = Math.max(2, currentPage - range);
      const endRange = Math.min(totalPages - 1, currentPage + range);

      // Thêm dấu ... nếu có khoảng trống từ trang đầu
      if (startRange > 2) {
        items.push('...');
      }

      // Thêm các trang trong range
      for (let i = startRange; i <= endRange; i++) {
        items.push(i);
      }

      // Thêm dấu ... nếu có khoảng trống đến trang cuối
      if (endRange < totalPages - 1) {
        items.push('...');
      }

      // Luôn hiển thị trang cuối (nếu khác trang đầu)
      if (totalPages > 1) {
        items.push(totalPages);
      }
    }

    return items;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className={`relative z-0 inline-flex rounded-md shadow-sm -space-x-px ${className}`}>
      <Button
        variant='outline'
        size='sm'
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
      >
        Previous
      </Button>

      {/* Page numbers với logic phức tạp */}
      {generatePaginationItems().map((item, index) => (
        <div key={index}>
          {item === '...' ? (
            <span className='relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700'>
              ...
            </span>
          ) : (
            <Button
              variant={item === currentPage ? 'default' : 'outline'}
              size='sm'
              onClick={() => onPageChange(item as number)}
              className='relative inline-flex items-center px-4 py-2 border text-sm font-medium'
            >
              {item}
            </Button>
          )}
        </div>
      ))}

      <Button
        variant='outline'
        size='sm'
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
      >
        Next
      </Button>
    </nav>
  );
}
