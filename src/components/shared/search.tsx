import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SearchBarProps {
  placeholder: string;
  context?: string;
  handleKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function SearchBar({ placeholder, handleKeyDown, handleChange, context }: SearchBarProps) {
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    if (typeof context === 'string') {
      setKeyword(context);
    }
  }, [context]);

  const handleKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (handleKeyDown) {
      handleKeyDown(e);
    } else {
      console.log(keyword);
    }
  };
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (handleChange) {
      handleChange(e);
    } else {
      setKeyword(e.target.value);
    }
  };
  return (
    <div className='flex w-full h-14  shadow-md rounded overflow-hidden bg-white'>
      <div className='flex items-center px-3 text-gray-500 '>
        <Search className='w-4 h-full' />
      </div>
      <Input
        type='text'
        placeholder={placeholder}
        value={keyword}
        className='border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none w-full h-full'
        onChange={handleChangeInput}
        onKeyDown={handleKeyDownInput}
      />
      <Button className='bg-green-500 hover:bg-green-600 rounded-none h-full w-24'>Search</Button>
    </div>
  );
}
