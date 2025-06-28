import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { Edit, Trash2, Eye, Search, Briefcase, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Pagination from '@/components/ui/pagination';
import { usePagination } from '@/hooks/use-pagination';
import jobsTypeApi from '@/apis/jobs-type.api';
import { JobType } from '@/@types/jobs-type';
import JobTypeFormModal from './JobTypeFormModal';
import JobTypeDetailModal from './JobTypeDetailModal';
import { toast } from 'react-toastify';

interface JobTypeTableProps {
  onOpenModal: () => void;
}

export default function JobTypeTable({ onOpenModal }: JobTypeTableProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedJobType, setSelectedJobType] = useState<JobType | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingJobType, setEditingJobType] = useState<JobType | null>(null);
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
    queryKey: ['jobTypes', pageIndex, pageSize, keyword],
    queryFn: () => jobsTypeApi.getJobTypes({ pageIndex, pageSize, keyword })
  });

  const jobTypes = data?.data.content.data || [];
  const totalRows = data?.data.content.totalRow || 0;

  const { currentPage, totalPages, handlePageChange } = usePagination({
    totalRows,
    pageSize,
    pageIndex
  });

  const deleteJobTypeMutation = useMutation({
    mutationFn: (id: number) => jobsTypeApi.deleteJobType(id),
    onSuccess: () => {
      toast.success('Job type deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['jobTypes'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete job type');
    }
  });

  const handleViewJobType = (jobType: JobType) => {
    setSelectedJobType(jobType);
    setIsDetailModalOpen(true);
  };

  const handleEditJobType = (jobType: JobType) => {
    setEditingJobType(jobType);
    setIsEditModalOpen(true);
  };

  const handleDeleteJobType = (jobType: JobType) => {
    if (window.confirm(`Are you sure you want to delete "${jobType.tenLoaiCongViec}"?`)) {
      deleteJobTypeMutation.mutate(jobType.id);
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingJobType(null);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedJobType(null);
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
        <p className='text-red-500'>Error loading job types</p>
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
              placeholder='Search job types...'
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
                  Job Type Name
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {jobTypes.map((jobType) => (
                <tr key={jobType.id} className='hover:bg-gray-50'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>#{jobType.id}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm font-medium text-gray-900'>{jobType.tenLoaiCongViec}</div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                    <div className='flex items-center space-x-2'>
                      <Button
                        size='sm'
                        variant='ghost'
                        className='text-blue-600 hover:text-blue-900'
                        onClick={() => handleViewJobType(jobType)}
                      >
                        <Eye className='h-4 w-4' />
                      </Button>
                      <Button
                        size='sm'
                        variant='ghost'
                        className='text-green-600 hover:text-green-900'
                        onClick={() => handleEditJobType(jobType)}
                      >
                        <Edit className='h-4 w-4' />
                      </Button>
                      <Button
                        size='sm'
                        variant='ghost'
                        className='text-red-600 hover:text-red-900'
                        onClick={() => handleDeleteJobType(jobType)}
                        disabled={deleteJobTypeMutation.isPending}
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

        {jobTypes.length === 0 && (
          <div className='text-center py-12'>
            <div className='text-gray-400 mb-4'>
              <Briefcase className='mx-auto h-12 w-12' />
            </div>
            <h3 className='text-lg font-medium text-gray-900 mb-2'>No job types found</h3>
            <p className='text-gray-500 mb-4'>
              {keyword ? 'Try adjusting your search terms.' : 'Get started by creating a new job type.'}
            </p>
            {!keyword && (
              <Button onClick={onOpenModal} className='bg-green-600 hover:bg-green-700'>
                <Plus className='w-4 h-4 mr-2' />
                Add Job Type
              </Button>
            )}
          </div>
        )}
      </div>

      {totalRows > 0 && (
        <div className='mt-6'>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      )}

      <JobTypeFormModal isOpen={isEditModalOpen} onClose={handleCloseEditModal} editingJobType={editingJobType} />
      <JobTypeDetailModal isOpen={isDetailModalOpen} onClose={handleCloseDetailModal} jobType={selectedJobType} />
    </>
  );
}
