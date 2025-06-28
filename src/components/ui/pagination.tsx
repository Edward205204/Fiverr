import { Button } from '@/components/ui/button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({ currentPage, totalPages, onPageChange, className = '' }: PaginationProps) {
  const generatePaginationItems = () => {
    const items = [];
    const range = 2;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      items.push(1);

      const startRange = Math.max(2, currentPage - range);
      const endRange = Math.min(totalPages - 1, currentPage + range);

      if (startRange > 2) {
        items.push('...');
      }

      for (let i = startRange; i <= endRange; i++) {
        items.push(i);
      }

      if (endRange < totalPages - 1) {
        items.push('...');
      }

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
