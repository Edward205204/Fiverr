import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router';
import useQueryConfig from '@/hooks/use-query-config';
import useInputSearch from '@/hooks/use-input-search';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  placeholder: string;
  onSearch?: (searchValue: string) => void;
  targetUrl?: string;
  queryKey?: string;
  className?: string;
  defaultValue?: string;
}

export default function SearchBar({
  placeholder,
  onSearch,
  targetUrl,
  queryKey = 'search',
  className = ' w-full h-14  bg-white',
  defaultValue
}: SearchBarProps) {
  const queryConfig = useQueryConfig();
  const { register, handleSubmit } = useInputSearch();
  const navigate = useNavigate();

  const onSearchSubmit = (data: { search?: string }) => {
    const value = data.search?.toString() || '';
    if (onSearch) {
      onSearch(value);
      return;
    }

    if (targetUrl) {
      // Tạo search params với encoding đúng cách
      const searchParams = new URLSearchParams();

      // Copy các query params hiện tại
      Object.entries(queryConfig).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== '') {
          searchParams.set(key, val.toString());
        }
      });

      // Thêm keyword mới với encoding đúng
      if (value.trim()) {
        searchParams.set(queryKey, value.trim());
      } else {
        searchParams.delete(queryKey);
      }

      // Reset về trang 1 khi search
      searchParams.set('pageIndex', '1');

      navigate({
        pathname: targetUrl,
        search: searchParams.toString()
      });
    }
  };

  return (
    <form onSubmit={handleSubmit && handleSubmit(onSearchSubmit)}>
      <div className={cn(className, 'flex shadow-md rounded overflow-hidden')}>
        <div className='flex items-center px-3 text-gray-500 '>
          <Search className='w-4 h-full' />
        </div>
        <Input
          type='text'
          placeholder={placeholder}
          defaultValue={defaultValue}
          autoComplete='off'
          {...(register && register('search'))}
          className='border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none w-full h-full'
        />
        <Button className='bg-green-500 hover:bg-green-600 rounded-none h-full w-24 ' type='submit'>
          Search
        </Button>
      </div>
    </form>
  );
}
