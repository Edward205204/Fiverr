import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface SearchBarProps {
  placeholder: string;
}
export default function SearchBar({ placeholder }: SearchBarProps) {
  return (
    <div className='flex w-full h-14  shadow-md rounded overflow-hidden bg-white'>
      <div className='flex items-center px-3 text-gray-500 '>
        <Search className='w-4 h-full' />
      </div>
      <Input
        type='text'
        placeholder={placeholder}
        className='border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none w-full h-full'
      />
      <Button className='bg-green-500 hover:bg-green-600 rounded-none h-full w-24'>Search</Button>
    </div>
  );
}
