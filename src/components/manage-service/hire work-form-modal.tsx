import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import servicesApi from '@/apis/services.api';
import { ThueCongViec, ThueCongViecCreateRequest } from '@/@types/services';
import { toast } from 'react-toastify';

interface ThueCongViecFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'add' | 'edit';
  thueCongViec?: ThueCongViec | null;
}

export default function HireWorkFormModal({ isOpen, onClose, mode, thueCongViec }: ThueCongViecFormModalProps) {
  const [formData, setFormData] = useState<ThueCongViecCreateRequest>({
    id: 0,
    maCongViec: 0,
    maNguoiThue: 0,
    ngayThue: '',
    hoanThanh: false
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (thueCongViec && mode === 'edit') {
      setFormData({
        id: thueCongViec.id,
        maCongViec: thueCongViec.maCongViec,
        maNguoiThue: thueCongViec.maNguoiThue,
        ngayThue: thueCongViec.ngayThue,
        hoanThanh: thueCongViec.hoanThanh
      });
    } else {
      setFormData({
        id: 0,
        maCongViec: 0,
        maNguoiThue: 0,
        ngayThue: '',
        hoanThanh: false
      });
    }
  }, [thueCongViec, mode]);

  const createMutation = useMutation({
    mutationFn: (data: ThueCongViecCreateRequest) => servicesApi.createThueCongViec(data),
    onSuccess: () => {
      toast.success('Thêm thuê công việc thành công!');
      queryClient.invalidateQueries({ queryKey: ['thueCongViec'] });
      onClose();
    },
    onError: () => {
      toast.error('Không thể thêm thuê công việc');
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ThueCongViecCreateRequest }) =>
      servicesApi.updateThueCongViec(id, data),
    onSuccess: () => {
      toast.success('Cập nhật thuê công việc thành công!');
      queryClient.invalidateQueries({ queryKey: ['thueCongViec'] });
      onClose();
    },
    onError: () => {
      toast.error('Không thể cập nhật thuê công việc');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'add') {
      createMutation.mutate(formData);
    } else {
      updateMutation.mutate({ id: thueCongViec!.id, data: formData });
    }
  };

  const handleInputChange = (field: keyof ThueCongViecCreateRequest, value: string | number | boolean) => {
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
          <h2 className='text-xl font-semibold text-gray-900'>
            {mode === 'add' ? 'Thêm thuê công việc' : 'Sửa thuê công việc'}
          </h2>
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
              <label className='block text-sm font-medium text-gray-700 mb-1'>Mã người thuê</label>
              <Input
                type='number'
                value={formData.maNguoiThue}
                onChange={(e) => handleInputChange('maNguoiThue', parseInt(e.target.value) || 0)}
                placeholder='Nhập mã người thuê'
                required
              />
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Ngày thuê</label>
            <Input
              type='text'
              value={formData.ngayThue}
              onChange={(e) => handleInputChange('ngayThue', e.target.value)}
              placeholder='Nhập ngày thuê (VD: 20/04/2025)'
            />
          </div>

          <div className='flex items-center space-x-2'>
            <Switch
              checked={formData.hoanThanh}
              onCheckedChange={(checked) => handleInputChange('hoanThanh', checked)}
            />
            <label className='text-sm font-medium text-gray-700'>Hoàn thành</label>
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
