import jobApi from '@/apis/job.api';
import JobTypeList from '@/components/shared/job-type-list';
import useQueryConfig from '@/hooks/use-query-config';
import { useQuery } from '@tanstack/react-query';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import GigCard from '@/components/shared/gig-card';
import { usePagination } from '@/hooks/use-pagination';
import Pagination from '@/components/ui/pagination';

const dropdownItems = ['Category', 'Service Options', 'Seller Details', 'Budget', 'Delivery Time'];
const toggleItems = ['Pro services', 'Local sellers', 'Online sellers'];

export default function Jobs() {
  const queryConfig = useQueryConfig();
  const { data } = useQuery({
    queryKey: ['jobs', queryConfig.pageIndex, queryConfig.pageSize, queryConfig.keyword],
    queryFn: () =>
      jobApi.getJobsManager({
        pageIndex: Number(queryConfig.pageIndex),
        pageSize: Number(queryConfig.pageSize),
        keyword: queryConfig.keyword || ''
      })
  });

  const GIGS = data?.data.content.data;
  const totalRows = data?.data.content.totalRow || 0;

  const pagination = usePagination({
    totalRows,
    pageSize: Number(queryConfig.pageSize),
    pageIndex: Number(queryConfig.pageIndex)
  });

  return (
    <div className='py-1'>
      <JobTypeList />

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
      <div className='py-6'>
        <div className='container'>
          {!data ? <>Empty</> : <div>{data.data.content.totalRow} Services available</div>}
        </div>
        <div className='container py-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 '>
            {GIGS?.map((gig) => (
              <GigCard
                key={gig.id}
                danhGia={gig.danhGia}
                giaTien={gig.giaTien}
                hinhAnh={gig.hinhAnh}
                saoCongViec={gig.saoCongViec}
                tenCongViec={gig.tenCongViec}
              />
            ))}
          </div>
        </div>

        {GIGS && GIGS.length > 0 && (
          <div className='container py-6'>
            <div className='flex items-center justify-between'>
              <div className='text-sm text-muted-foreground'>
                Showing {pagination.showingInfo.start} to {pagination.showingInfo.end} of {pagination.showingInfo.total}{' '}
                results
              </div>
              <div className=''>
                <Pagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  onPageChange={pagination.handlePageChange}
                  className=''
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
