import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import servicesApi from '@/apis/services.api';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Eye, Plus } from 'lucide-react';
import Pagination from '@/components/ui/pagination';
import { usePagination } from '@/hooks/use-pagination';
import { ThueCongViec } from '@/@types/services';
import { toast } from 'react-toastify';
import ThueCongViecDetailModal from '@/components/manage-service/hire work-detail-modal';
import ThueCongViecFormModal from '@/components/manage-service/hire work-form-modal';

interface ThueCongViecTableProps {
  keyword?: string;
  pageIndex: number;
  pageSize: number;
}

export default function HireWorkTable({ keyword, pageIndex, pageSize }: ThueCongViecTableProps) {
  const [selectedThueCongViecId, setSelectedThueCongViecId] = useState<number | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [editThueCongViec, setEditThueCongViec] = useState<ThueCongViec | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['thueCongViec', pageIndex, pageSize, keyword],
    queryFn: () => servicesApi.getThueCongViecList({ pageIndex, pageSize, keyword })
  });

  const thueCongViecList: ThueCongViec[] = data?.data.content.data || [];
  const totalRows = data?.data.content.totalRow || 0;

  const { currentPage, totalPages, handlePageChange, showingInfo } = usePagination({
    totalRows,
    pageSize,
    pageIndex
  });

  const deleteThueCongViecMutation = useMutation({
    mutationFn: (id: number) => servicesApi.deleteThueCongViec(id),
    onSuccess: () => {
      toast.success('Thuê công việc đã được xóa thành công!');
      queryClient.invalidateQueries({ queryKey: ['thueCongViec'] });
    },
    onError: () => {
      toast.error('Không thể xóa thuê công việc');
    }
  });

  const handleViewThueCongViec = (thueCongViecId: number) => {
    setSelectedThueCongViecId(thueCongViecId);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedThueCongViecId(null);
  };

  const handleDeleteThueCongViec = (thueCongViec: ThueCongViec) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa thuê công việc ID: ${thueCongViec.id}?`)) {
      deleteThueCongViecMutation.mutate(thueCongViec.id);
    }
  };

  const handleAddThueCongViec = () => {
    setFormMode('add');
    setEditThueCongViec(null);
    setIsFormModalOpen(true);
  };

  const handleEditThueCongViec = (thueCongViec: ThueCongViec) => {
    setFormMode('edit');
    setEditThueCongViec(thueCongViec);
    setIsFormModalOpen(true);
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setEditThueCongViec(null);
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
          <h3 className='text-lg font-semibold'>Danh sách thuê công việc</h3>
          <Button onClick={handleAddThueCongViec} className='flex items-center gap-2'>
            <Plus className='w-4 h-4' /> Thêm thuê công việc
          </Button>
        </div>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50 border-b border-gray-200'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>ID</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Mã công việc
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Mã người thuê
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Ngày thuê
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Hoàn thành
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {thueCongViecList.map((thueCongViec) => (
                <tr key={thueCongViec.id} className='hover:bg-gray-50'>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span className='text-sm font-medium text-gray-900'>{thueCongViec.id}</span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span className='text-sm text-gray-900'>{thueCongViec.maCongViec}</span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span className='text-sm text-gray-900'>{thueCongViec.maNguoiThue}</span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span className='text-sm text-gray-900'>{thueCongViec.ngayThue}</span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        thueCongViec.hoanThanh ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {thueCongViec.hoanThanh ? 'Hoàn thành' : 'Chưa hoàn thành'}
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                    <div className='flex items-center space-x-2'>
                      <Button
                        size='sm'
                        variant='ghost'
                        className='text-blue-600 hover:text-blue-900'
                        onClick={() => handleViewThueCongViec(thueCongViec.id)}
                      >
                        <Eye className='h-4 w-4' />
                      </Button>
                      <Button
                        size='sm'
                        variant='ghost'
                        className='text-green-600 hover:text-green-900'
                        onClick={() => handleEditThueCongViec(thueCongViec)}
                      >
                        <Edit className='h-4 w-4' />
                      </Button>
                      <Button
                        size='sm'
                        variant='ghost'
                        className='text-red-600 hover:text-red-900'
                        onClick={() => handleDeleteThueCongViec(thueCongViec)}
                        disabled={deleteThueCongViecMutation.isPending}
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
              Trước
            </Button>
            <Button
              variant='outline'
              size='sm'
              disabled={currentPage >= totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Sau
            </Button>
          </div>
          <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
            <div>
              <p className='text-sm text-gray-700'>
                Hiển thị <span className='font-medium'>{showingInfo.start}</span> đến{' '}
                <span className='font-medium'>{showingInfo.end}</span> trong tổng số{' '}
                <span className='font-medium'>{showingInfo.total}</span> kết quả
              </p>
            </div>
            <div>
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          </div>
        </div>
      </div>

      {isDetailModalOpen && selectedThueCongViecId && (
        <ThueCongViecDetailModal
          thueCongViecId={selectedThueCongViecId}
          isOpen={isDetailModalOpen}
          onClose={handleCloseDetailModal}
        />
      )}

      {isFormModalOpen && (
        <ThueCongViecFormModal
          isOpen={isFormModalOpen}
          onClose={handleCloseFormModal}
          mode={formMode}
          thueCongViec={editThueCongViec}
        />
      )}
    </>
  );
}
