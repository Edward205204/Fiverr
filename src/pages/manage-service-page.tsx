import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ThueCongViecTable from '@/components/manage-service/hire work-table';
import BinhLuanTable from '@/components/manage-service/comment-table';
import useQueryConfig from '@/hooks/use-query-config';
import SearchBar from '@/components/shared/search';

export default function ManageServicePage() {
  const [activeTab, setActiveTab] = useState<'thueCongViec' | 'binhLuan'>('thueCongViec');
  const queryConfig = useQueryConfig();

  return (
    <div className='pt-6 pb-4 border-t border-gray-200'>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold text-gray-900 mb-6'>Quản lý dịch vụ</h1>

        {/* Tabs */}
        <div className='border-b border-gray-200'>
          <nav className='-mb-px flex space-x-8'>
            <Button
              variant={activeTab === 'thueCongViec' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('thueCongViec')}
              className='py-2 px-1 border-b-2 font-medium text-sm'
            >
              Thuê công việc
            </Button>
            <Button
              variant={activeTab === 'binhLuan' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('binhLuan')}
              className='py-2 px-1 border-b-2 font-medium text-sm'
            >
              Bình luận
            </Button>
          </nav>
        </div>
      </div>

      {/* Search Bar - chỉ hiển thị cho ThueCongViec */}
      {activeTab === 'thueCongViec' && (
        <div className='my-8'>
          <SearchBar
            placeholder='Tìm kiếm thuê công việc'
            targetUrl='/manage-service'
            queryKey='keyword'
            className='w-[75%] h-12'
          />
        </div>
      )}

      {/* Content */}
      <div className='mt-8'>
        {activeTab === 'thueCongViec' ? (
          <ThueCongViecTable
            keyword={queryConfig.keyword}
            pageIndex={Number(queryConfig.pageIndex)}
            pageSize={Number(queryConfig.pageSize)}
          />
        ) : (
          <BinhLuanTable />
        )}
      </div>
    </div>
  );
}
