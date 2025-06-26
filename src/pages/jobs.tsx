import { JobsAPI } from '@/apis/jobs.api';
import useQueryConfig from '@/hooks/use-query-config';
import { useQuery } from '@tanstack/react-query';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
const dropdownItems = ['Category', 'Service Options', 'Seller Details', 'Budget', 'Delivery Time'];
const toggleItems = ['Pro services', 'Local sellers', 'Online sellers'];
export default function Jobs() {
  const queryConfig = useQueryConfig();
  const { data } = useQuery({
    queryKey: ['jobs', queryConfig.pageIndex, queryConfig.pageSize, queryConfig.keyword],
    queryFn: () =>
      JobsAPI.getJobs({
        pageIndex: Number(queryConfig.pageIndex),
        pageSize: Number(queryConfig.pageSize),
        keyword: queryConfig.keyword || ''
      })
  });
  console.log(data);
  return (
    <div className='py-1'>
      <div className='container'>
        <div className='py-4 text-3xl px-4 font-bold'>Result for "{queryConfig.keyword}"</div>
      </div>
      <div className='  px-4 py-4 border-b bg-white'>
        <div className='container'>
          <div className=' items-center flex flex-wrap gap-4'>
            {dropdownItems.map((label) => (
              <Button
                key={label}
                variant='outline'
                className='flex items-center gap-1 rounded-full text-sm font-normal'
              >
                {label}
                <ChevronDown size={16} />
              </Button>
            ))}
            <div className='flex flex-wrap items-center gap-6 ml-auto'>
              {toggleItems.map((label) => (
                <label key={label} className='flex items-center gap-2 text-sm text-muted-foreground'>
                  <Switch />
                  {label}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
