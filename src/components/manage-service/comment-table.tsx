import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import servicesApi from '@/apis/services.api';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Eye, Plus } from 'lucide-react';
import { BinhLuan } from '@/@types/services';
import { toast } from 'react-toastify';
import BinhLuanDetailModal from '@/components/manage-service/comment-detail-modal';
import BinhLuanFormModal from '@/components/manage-service/comment-form-modal';

export default function CommentTable() {
  const [selectedBinhLuanId, setSelectedBinhLuanId] = useState<number | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [editBinhLuan, setEditBinhLuan] = useState<BinhLuan | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['binhLuan'],
    queryFn: () => servicesApi.getBinhLuanList()
  });

  const binhLuanList: BinhLuan[] = data?.data.content || [];

  const deleteBinhLuanMutation = useMutation({
    mutationFn: (id: number) => servicesApi.deleteBinhLuan(id),
    onSuccess: () => {
      toast.success('Bình luận đã được xóa thành công!');
      queryClient.invalidateQueries({ queryKey: ['binhLuan'] });
    },
    onError: () => {
      toast.error('Không thể xóa bình luận');
    }
  });

  const handleViewBinhLuan = (binhLuanId: number) => {
    setSelectedBinhLuanId(binhLuanId);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedBinhLuanId(null);
  };

  const handleDeleteBinhLuan = (binhLuan: BinhLuan) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa bình luận ID: ${binhLuan.id}?`)) {
      deleteBinhLuanMutation.mutate(binhLuan.id);
    }
  };

  const handleAddBinhLuan = () => {
    setFormMode('add');
    setEditBinhLuan(null);
    setIsFormModalOpen(true);
  };

  const handleEditBinhLuan = (binhLuan: BinhLuan) => {
    setFormMode('edit');
    setEditBinhLuan(binhLuan);
    setIsFormModalOpen(true);
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setEditBinhLuan(null);
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
          <h3 className='text-lg font-semibold'>Danh sách bình luận</h3>
          <Button onClick={handleAddBinhLuan} className='flex items-center gap-2'>
            <Plus className='w-4 h-4' /> Thêm bình luận
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
                  Mã người bình luận
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Nội dung
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Số sao
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Ngày bình luận
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {binhLuanList.map((binhLuan) => (
                <tr key={binhLuan.id} className='hover:bg-gray-50'>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span className='text-sm font-medium text-gray-900'>{binhLuan.id}</span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span className='text-sm text-gray-900'>{binhLuan.maCongViec}</span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span className='text-sm text-gray-900'>{binhLuan.maNguoiBinhLuan}</span>
                  </td>
                  <td className='px-6 py-4'>
                    <div className='text-sm text-gray-900 max-w-xs truncate' title={binhLuan.noiDung}>
                      {binhLuan.noiDung}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span className='text-yellow-600 font-bold'>{binhLuan.saoBinhLuan}★</span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span className='text-sm text-gray-900'>{binhLuan.ngayBinhLuan}</span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                    <div className='flex items-center space-x-2'>
                      <Button
                        size='sm'
                        variant='ghost'
                        className='text-blue-600 hover:text-blue-900'
                        onClick={() => handleViewBinhLuan(binhLuan.id)}
                      >
                        <Eye className='h-4 w-4' />
                      </Button>
                      <Button
                        size='sm'
                        variant='ghost'
                        className='text-green-600 hover:text-green-900'
                        onClick={() => handleEditBinhLuan(binhLuan)}
                      >
                        <Edit className='h-4 w-4' />
                      </Button>
                      <Button
                        size='sm'
                        variant='ghost'
                        className='text-red-600 hover:text-red-900'
                        onClick={() => handleDeleteBinhLuan(binhLuan)}
                        disabled={deleteBinhLuanMutation.isPending}
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
      </div>

      {isDetailModalOpen && selectedBinhLuanId && (
        <BinhLuanDetailModal
          binhLuanId={selectedBinhLuanId}
          isOpen={isDetailModalOpen}
          onClose={handleCloseDetailModal}
        />
      )}

      {isFormModalOpen && (
        <BinhLuanFormModal
          isOpen={isFormModalOpen}
          onClose={handleCloseFormModal}
          mode={formMode}
          binhLuan={editBinhLuan}
        />
      )}
    </>
  );
}
