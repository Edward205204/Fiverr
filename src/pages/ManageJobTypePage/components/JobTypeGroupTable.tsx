import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { Edit, Trash2, Eye, Search, Layers, Upload, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Pagination from '@/components/ui/pagination';
import { usePagination } from '@/hooks/use-pagination';
import jobsTypeApi from '@/apis/jobs-type.api';
import { JobTypeDetail } from '@/@types/jobs-type';
import JobTypeGroupFormModal from './JobTypeGroupFormModal';
import JobTypeGroupDetailModal from './JobTypeGroupDetailModal';
import { toast } from 'react-toastify';

interface JobTypeGroupTableProps {
  onOpenModal: () => void;
}

export default function JobTypeGroupTable({ onOpenModal }: JobTypeGroupTableProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedGroup, setSelectedGroup] = useState<JobTypeDetail | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<JobTypeDetail | null>(null);
  const [uploadingImageId, setUploadingImageId] = useState<number | null>(null);
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
    queryKey: ['jobTypeDetails', pageIndex, pageSize, keyword],
    queryFn: () => jobsTypeApi.getJobTypeDetails({ pageIndex, pageSize, keyword })
  });

  const jobTypeGroups = data?.data.content.data || [];
  const totalRows = data?.data.content.totalRow || 0;

  const { currentPage, totalPages, handlePageChange } = usePagination({
    totalRows,
    pageSize,
    pageIndex
  });

  const deleteJobTypeGroupMutation = useMutation({
    mutationFn: (id: number) => jobsTypeApi.deleteJobTypeDetail(id),
    onSuccess: () => {
      toast.success('Job type group deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['jobTypeDetails'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete job type group');
    }
  });

  const uploadImageMutation = useMutation({
    mutationFn: ({ id, formData }: { id: number; formData: FormData }) =>
      jobsTypeApi.uploadJobTypeGroupImage(id, formData),
    onSuccess: () => {
      toast.success('Image uploaded successfully!');
      queryClient.invalidateQueries({ queryKey: ['jobTypeDetails'] });
      setUploadingImageId(null);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to upload image');
      setUploadingImageId(null);
    }
  });

  const handleViewGroup = (group: JobTypeDetail) => {
    setSelectedGroup(group);
    setIsDetailModalOpen(true);
  };

  const handleEditGroup = (group: JobTypeDetail) => {
    setEditingGroup(group);
    setIsEditModalOpen(true);
  };

  const handleDeleteGroup = (group: JobTypeDetail) => {
    if (window.confirm(`Are you sure you want to delete "${group.tenNhom}"?`)) {
      deleteJobTypeGroupMutation.mutate(group.id);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, groupId: number) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('formFile', file);

    setUploadingImageId(groupId);
    uploadImageMutation.mutate({ id: groupId, formData });
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingGroup(null);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedGroup(null);
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
        <p className='text-red-500'>Error loading job type groups</p>
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
              placeholder='Search job type groups...'
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
                  Group Name
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Job Type ID
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Image
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Detail Items
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {jobTypeGroups.map((group) => (
                <tr key={group.id} className='hover:bg-gray-50'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>#{group.id}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm font-medium text-gray-900'>{group.tenNhom}</div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>#{group.maLoaiCongviec}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='flex items-center space-x-2'>
                      {group.hinhAnh ? (
                        <img
                          src={group.hinhAnh}
                          alt={group.tenNhom}
                          className='w-10 h-10 rounded object-cover'
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className='w-10 h-10 bg-gray-200 rounded flex items-center justify-center'>
                          <Layers className='w-4 h-4 text-gray-400' />
                        </div>
                      )}
                      <div className='relative'>
                        <input
                          type='file'
                          accept='image/*'
                          onChange={(e) => handleImageUpload(e, group.id)}
                          className='hidden'
                          id={`upload-${group.id}`}
                          disabled={uploadingImageId === group.id}
                        />
                        <label
                          htmlFor={`upload-${group.id}`}
                          className={`cursor-pointer p-1 rounded hover:bg-gray-100 ${
                            uploadingImageId === group.id ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          <Upload className='w-4 h-4 text-gray-500' />
                        </label>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='flex items-center text-sm text-gray-900'>
                      <Layers className='w-4 h-4 mr-1' />
                      {group.dsChiTietLoai.length} items
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                    <div className='flex items-center space-x-2'>
                      <Button
                        size='sm'
                        variant='ghost'
                        className='text-blue-600 hover:text-blue-900'
                        onClick={() => handleViewGroup(group)}
                      >
                        <Eye className='h-4 w-4' />
                      </Button>
                      <Button
                        size='sm'
                        variant='ghost'
                        className='text-green-600 hover:text-green-900'
                        onClick={() => handleEditGroup(group)}
                      >
                        <Edit className='h-4 w-4' />
                      </Button>
                      <Button
                        size='sm'
                        variant='ghost'
                        className='text-red-600 hover:text-red-900'
                        onClick={() => handleDeleteGroup(group)}
                        disabled={deleteJobTypeGroupMutation.isPending}
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

        {jobTypeGroups.length === 0 && (
          <div className='text-center py-12'>
            <div className='text-gray-400 mb-4'>
              <Layers className='mx-auto h-12 w-12' />
            </div>
            <h3 className='text-lg font-medium text-gray-900 mb-2'>No job type groups found</h3>
            <p className='text-gray-500 mb-4'>
              {keyword ? 'Try adjusting your search terms.' : 'Get started by creating a new job type group.'}
            </p>
            {!keyword && (
              <Button onClick={onOpenModal} className='bg-green-600 hover:bg-green-700'>
                <Plus className='w-4 h-4 mr-2' />
                Add Job Type Group
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

      <JobTypeGroupFormModal isOpen={isEditModalOpen} onClose={handleCloseEditModal} editingGroup={editingGroup} />
      <JobTypeGroupDetailModal isOpen={isDetailModalOpen} onClose={handleCloseDetailModal} group={selectedGroup} />
    </>
  );
}
