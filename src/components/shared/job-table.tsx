import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import jobApi from '@/apis/job.api';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Eye, Plus } from 'lucide-react';
import Pagination from '@/components/ui/pagination';
import { usePagination } from '@/hooks/use-pagination';
import { Job } from '@/@types/jobs';
import { toast } from 'react-toastify';
import JobDetailModal from '@/components/shared/job-detail-modal';
import JobFormModal from '@/components/shared/job-form-modal';

interface JobTableProps {
  keyword?: string;
  pageIndex: number;
  pageSize: number;
}

export default function JobTable({ keyword, pageIndex, pageSize }: JobTableProps) {
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [editJob, setEditJob] = useState<Job | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['jobs', pageIndex, pageSize, keyword],
    queryFn: () => jobApi.getJobs({ pageIndex, pageSize, keyword })
  });

  const jobs: Job[] = data?.data.content.data || [];
  const totalRows = data?.data.content.totalRow || 0;

  const { currentPage, totalPages, handlePageChange, handlePageSizeChange, showingInfo } = usePagination({
    totalRows,
    pageSize,
    pageIndex
  });

  const deleteJobMutation = useMutation({
    mutationFn: (id: number) => jobApi.deleteJob(id),
    onSuccess: () => {
      toast.success('Job deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
    onError: () => {
      toast.error('Failed to delete job');
    }
  });

  const handleViewJob = (jobId: number) => {
    setSelectedJobId(jobId);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedJobId(null);
  };

  const handleDeleteJob = (job: Job) => {
    if (window.confirm(`Are you sure you want to delete job "${job.tenCongViec}"?`)) {
      deleteJobMutation.mutate(job.id);
    }
  };

  const handleAddJob = () => {
    setFormMode('add');
    setEditJob(null);
    setIsFormModalOpen(true);
  };

  const handleEditJob = (job: Job) => {
    setFormMode('edit');
    setEditJob(job);
    setIsFormModalOpen(true);
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setEditJob(null);
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
        <p className='text-red-500'>Có lỗi xảy ra khi tải dữ liệu</p>
      </div>
    );
  }

  return (
    <>
      <div className='bg-white rounded-lg shadow-md overflow-hidden'>
        <div className='flex items-center justify-between px-6 py-4 border-b border-gray-100'>
          <h3 className='text-lg font-semibold'>Job List</h3>
          <Button onClick={handleAddJob} className='flex items-center gap-2'>
            <Plus className='w-4 h-4' /> Add Job
          </Button>
        </div>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50 border-b border-gray-200'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Job</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Price
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Rating
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Creator
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {jobs.map((job) => (
                <tr key={job.id} className='hover:bg-gray-50'>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='flex items-center'>
                      <div className='flex-shrink-0 h-10 w-10'>
                        {job.hinhAnh ? (
                          <img className='h-10 w-10 rounded object-cover' src={job.hinhAnh} alt={job.tenCongViec} />
                        ) : (
                          <div className='h-10 w-10 rounded bg-green-500 flex items-center justify-center'>
                            <span className='text-white font-medium text-sm'>
                              {job.tenCongViec.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className='ml-4'>
                        <div className='text-sm font-medium text-gray-900'>{job.tenCongViec}</div>
                        <div className='text-xs text-gray-500 line-clamp-1 max-w-xs'>{job.moTaNgan}</div>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span className='text-green-700 font-semibold'>${job.giaTien}</span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span className='text-yellow-600 font-bold'>{job.saoCongViec}★</span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span className='text-gray-700'>{job.nguoiTao}</span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                    <div className='flex items-center space-x-2'>
                      <Button
                        size='sm'
                        variant='ghost'
                        className='text-blue-600 hover:text-blue-900'
                        onClick={() => handleViewJob(job.id)}
                      >
                        <Eye className='h-4 w-4' />
                      </Button>
                      <Button
                        size='sm'
                        variant='ghost'
                        className='text-green-600 hover:text-green-900'
                        onClick={() => handleEditJob(job)}
                      >
                        <Edit className='h-4 w-4' />
                      </Button>
                      <Button
                        size='sm'
                        variant='ghost'
                        className='text-red-600 hover:text-red-900'
                        onClick={() => handleDeleteJob(job)}
                        disabled={deleteJobMutation.isPending}
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
        <div className='bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6'>
          <div className='flex-1 flex justify-between sm:hidden'>
            <Button
              variant='outline'
              size='sm'
              disabled={currentPage <= 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </Button>
            <Button
              variant='outline'
              size='sm'
              disabled={currentPage >= totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </Button>
          </div>
          <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
            <div>
              <p className='text-sm text-gray-700'>
                Showing <span className='font-medium'>{showingInfo.start}</span> to{' '}
                <span className='font-medium'>{showingInfo.end}</span> of{' '}
                <span className='font-medium'>{showingInfo.total}</span> results
              </p>
            </div>
            <div>
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          </div>
        </div>
        <div className='bg-white px-4 py-3 border-t border-gray-200'>
          <div className='flex items-center space-x-2'>
            <span className='text-sm text-gray-700'>Show:</span>
            <select
              value={pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              className='border border-gray-300 rounded-md px-3 py-1 text-sm'
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span className='text-sm text-gray-700'>entries</span>
          </div>
        </div>
      </div>
      {/* Job Detail Modal */}
      <JobDetailModal jobId={selectedJobId} isOpen={isDetailModalOpen} onClose={handleCloseDetailModal} />
      {/* Job Form Modal */}
      <JobFormModal
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        initialData={editJob || undefined}
        mode={formMode}
      />
    </>
  );
}
