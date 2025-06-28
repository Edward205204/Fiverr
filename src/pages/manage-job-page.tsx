import SearchBar from '@/components/shared/search';
import JobTable from '@/components/shared/job-table';
import useQueryConfig from '@/hooks/use-query-config';

export default function ManageJobPage() {
  const queryConfig = useQueryConfig();

  return (
    <div className='pt-6 pb-4 border-t border-gray-200'>
      <div className='my-8'>
        <SearchBar
          placeholder='Search job by name or description'
          targetUrl='/manage-job'
          queryKey='keyword'
          className='w-[75%] h-12'
        />
      </div>
      <div className='mt-8'>
        <JobTable
          keyword={queryConfig.keyword}
          pageIndex={Number(queryConfig.pageIndex)}
          pageSize={Number(queryConfig.pageSize)}
        />
      </div>
    </div>
  );
}
