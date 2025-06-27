import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import servicesApi from '@/apis/services.api';
import { BinhLuan, BinhLuanCreateRequest } from '@/@types/services';
import { toast } from 'react-toastify';

interface BinhLuanFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'add' | 'edit';
  binhLuan?: BinhLuan | null;
}

export default function CommentFormModal({ isOpen, onClose, mode, binhLuan }: BinhLuanFormModalProps) {
  const [formData, setFormData] = useState<BinhLuanCreateRequest>({
    id: 0,
    maCongViec: 0,
    maNguoiBinhLuan: 0,
    ngayBinhLuan: '',
    noiDung: '',
    saoBinhLuan: 0
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (binhLuan && mode === 'edit') {
      setFormData({
        id: binhLuan.id,
        maCongViec: binhLuan.maCongViec,
        maNguoiBinhLuan: binhLuan.maNguoiBinhLuan,
        ngayBinhLuan: binhLuan.ngayBinhLuan,
        noiDung: binhLuan.noiDung,
        saoBinhLuan: binhLuan.saoBinhLuan
      });
    } else {
      setFormData({
        id: 0,
        maCongViec: 0,
        maNguoiBinhLuan: 0,
        ngayBinhLuan: '',
        noiDung: '',
        saoBinhLuan: 0
      });
    }
  }, [binhLuan, mode]);

  const createMutation = useMutation({
    mutationFn: (data: BinhLuanCreateRequest) => servicesApi.createBinhLuan(data),
    onSuccess: () => {
      toast.success('Thêm bình luận thành công!');
      queryClient.invalidateQueries({ queryKey: ['binhLuan'] });
      onClose();
    },
    onError: () => {
      toast.error('Không thể thêm bình luận');
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: BinhLuanCreateRequest }) => servicesApi.updateBinhLuan(id, data),
    onSuccess: () => {
      toast.success('Cập nhật bình luận thành công!');
      queryClient.invalidateQueries({ queryKey: ['binhLuan'] });
      onClose();
    },
    onError: () => {
      toast.error('Không thể cập nhật bình luận');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'add') {
      createMutation.mutate(formData);
    } else {
      updateMutation.mutate({ id: binhLuan!.id, data: formData });
    }
  };

  const handleInputChange = (field: keyof BinhLuanCreateRequest, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto'>
        <div className='flex items-center justify-between p-6 border-b border-gray-200'>
          <h2 className='text-xl font-semibold text-gray-900'>{mode === 'add' ? 'Thêm bình luận' : 'Sửa bình luận'}</h2>
          <Button variant='ghost' size='sm' onClick={onClose} className='text-gray-400 hover:text-gray-600'>
            <X className='h-5 w-5' />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className='p-6 space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Mã công việc</label>
              <Input
                type='number'
                value={formData.maCongViec}
                onChange={(e) => handleInputChange('maCongViec', parseInt(e.target.value) || 0)}
                placeholder='Nhập mã công việc'
                required
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Mã người bình luận</label>
              <Input
                type='number'
                value={formData.maNguoiBinhLuan}
                onChange={(e) => handleInputChange('maNguoiBinhLuan', parseInt(e.target.value) || 0)}
                placeholder='Nhập mã người bình luận'
                required
              />
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Ngày bình luận</label>
            <Input
              type='text'
              value={formData.ngayBinhLuan}
              onChange={(e) => handleInputChange('ngayBinhLuan', e.target.value)}
              placeholder='Nhập ngày bình luận (VD: 20/04/2025)'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Số sao</label>
            <Input
              type='number'
              min='1'
              max='5'
              value={formData.saoBinhLuan}
              onChange={(e) => handleInputChange('saoBinhLuan', parseInt(e.target.value) || 0)}
              placeholder='Nhập số sao (1-5)'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Nội dung</label>
            <textarea
              value={formData.noiDung}
              onChange={(e) => handleInputChange('noiDung', e.target.value)}
              placeholder='Nhập nội dung bình luận'
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent'
              rows={4}
              required
            />
          </div>

          <div className='flex justify-end gap-3 pt-4 border-t border-gray-200'>
            <Button type='button' variant='outline' onClick={onClose}>
              Hủy
            </Button>
            <Button type='submit' disabled={createMutation.isPending || updateMutation.isPending}>
              {mode === 'add' ? 'Thêm' : 'Cập nhật'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
