import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { Edit, Trash2, Eye, Search, Briefcase, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Pagination from '@/components/ui/pagination';
import { usePagination } from '@/hooks/use-pagination';
import servicesApi from '@/apis/services.api';
import { ThueCongViec } from '@/@types/services';
import HireWorkFormModal from './hire-work-form-modal';
import HireWorkDetailModal from './hire-work-detail-modal';
import { toast } from 'react-toastify';

interface HireWorkTableProps {
  onOpenModal: () => void;
}

export default function HireWorkTable({ onOpenModal }: HireWorkTableProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedHireWork, setSelectedHireWork] = useState<ThueCongViec | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingHireWork, setEditingHireWork] = useState<ThueCongViec | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const queryClient = useQueryClient();

  const pageIndex = Number(searchParams.get('pageIndex')) || 1;
  const pageSize = Number(searchParams.get('pageSize')) || 10;
  const keyword = searchParams.get('keyword') || '';

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSearchParams = new URLSearchParams(searchParams);
    if (searchValue.trim()) {
      newSearchParams.set('keyword', searchValue.trim());
    } else {
      newSearchParams.delete('keyword');
    }
    newSearchParams.set('pageIndex', '1');
    setSearchParams(newSearchParams);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['thueCongViec', pageIndex, pageSize, keyword],
    queryFn: () => servicesApi.getThueCongViecList({ pageIndex, pageSize, keyword })
  });

  const hireWorks = data?.data.content.data || [];
  const totalRows = data?.data.content.totalRow || 0;

  const { currentPage, totalPages, handlePageChange } = usePagination({
    totalRows,
    pageSize,
    pageIndex
  });

  const deleteHireWorkMutation = useMutation({
    mutationFn: (id: number) => servicesApi.deleteThueCongViec(id),
    onSuccess: () => {
      toast.success('Hire work deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['thueCongViec'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete hire work');
    }
  });

  const handleViewHireWork = (hireWork: ThueCongViec) => {
    setSelectedHireWork(hireWork);
    setIsDetailModalOpen(true);
  };

  const handleEditHireWork = (hireWork: ThueCongViec) => {
    setEditingHireWork(hireWork);
    setIsEditModalOpen(true);
  };

  const handleDeleteHireWork = (hireWork: ThueCongViec) => {
    if (window.confirm(`Are you sure you want to delete hire work ID: ${hireWork.id}?`)) {
      deleteHireWorkMutation.mutate(hireWork.id);
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingHireWork(null);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedHireWork(null);
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-64'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-green-500'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-center py-8'>
        <p className='text-red-500'>Error loading hire works</p>
      </div>
    );
  }

  return (
    <>
      <div className='mb-6'>
        <form onSubmit={handleSearchSubmit} className='flex gap-2'>
          <div className='relative flex-1'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
            <Input
              type='text'
              placeholder='Search hire works...'
              value={searchValue}
              onChange={handleSearchChange}
              className='pl-10'
            />
          </div>
          <Button type='submit' className='bg-green-600 hover:bg-green-700'>
            Search
          </Button>
        </form>
      </div>

      <div className='bg-white rounded-lg shadow overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50 border-b border-gray-200'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>ID</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Job ID
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Hirer ID
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Hire Date
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Status
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {hireWorks.map((hireWork) => (
                <tr key={hireWork.id} className='hover:bg-gray-50'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>#{hireWork.id}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{hireWork.maCongViec}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{hireWork.maNguoiThue}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{hireWork.ngayThue || 'N/A'}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        hireWork.hoanThanh ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {hireWork.hoanThanh ? 'Completed' : 'Pending'}
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                    <div className='flex items-center space-x-2'>
                      <Button
                        size='sm'
                        variant='ghost'
                        className='text-blue-600 hover:text-blue-900'
                        onClick={() => handleViewHireWork(hireWork)}
                      >
                        <Eye className='h-4 w-4' />
                      </Button>
                      <Button
                        size='sm'
                        variant='ghost'
                        className='text-green-600 hover:text-green-900'
                        onClick={() => handleEditHireWork(hireWork)}
                      >
                        <Edit className='h-4 w-4' />
                      </Button>
                      <Button
                        size='sm'
                        variant='ghost'
                        className='text-red-600 hover:text-red-900'
                        onClick={() => handleDeleteHireWork(hireWork)}
                        disabled={deleteHireWorkMutation.isPending}
                      >
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {hireWorks.length === 0 && (
          <div className='text-center py-12'>
            <div className='text-gray-400 mb-4'>
              <Briefcase className='mx-auto h-12 w-12' />
            </div>
            <h3 className='text-lg font-medium text-gray-900 mb-2'>No hire works found</h3>
            <p className='text-gray-500 mb-4'>
              {keyword ? 'Try adjusting your search terms.' : 'Get started by creating a new hire work.'}
            </p>
            {!keyword && (
              <Button onClick={onOpenModal} className='bg-green-600 hover:bg-green-700'>
                <Plus className='w-4 h-4 mr-2' />
                Add Hire Work
              </Button>
            )}
          </div>
        )}

        {hireWorks.length > 0 && totalPages > 1 && (
          <div className='px-6 py-4 border-t border-gray-200'>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        )}
      </div>

      {/* Modals */}
      <HireWorkFormModal isOpen={isEditModalOpen} onClose={handleCloseEditModal} editingHireWork={editingHireWork} />
      <HireWorkDetailModal isOpen={isDetailModalOpen} onClose={handleCloseDetailModal} hireWork={selectedHireWork} />
    </>
  );
}
