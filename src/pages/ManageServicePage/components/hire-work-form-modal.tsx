import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import servicesApi from '@/apis/services.api';
import { ThueCongViec, ThueCongViecCreateRequest } from '@/@types/services';
import { toast } from 'react-toastify';

interface HireWorkFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingHireWork?: ThueCongViec | null;
}

export default function HireWorkFormModal({ isOpen, onClose, editingHireWork }: HireWorkFormModalProps) {
  const [formData, setFormData] = useState<ThueCongViecCreateRequest>({
    id: 0,
    maCongViec: 0,
    maNguoiThue: 0,
    ngayThue: '',
    hoanThanh: false
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isOpen) {
      if (editingHireWork) {
        setFormData({
          id: editingHireWork.id,
          maCongViec: editingHireWork.maCongViec,
          maNguoiThue: editingHireWork.maNguoiThue,
          ngayThue: editingHireWork.ngayThue,
          hoanThanh: editingHireWork.hoanThanh
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
      setErrors({});
    }
  }, [isOpen, editingHireWork]);

  const createHireWorkMutation = useMutation({
    mutationFn: (data: ThueCongViecCreateRequest) => servicesApi.createThueCongViec(data),
    onSuccess: () => {
      toast.success('Hire work created successfully!');
      queryClient.invalidateQueries({ queryKey: ['thueCongViec'] });
      handleClose();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create hire work');
    }
  });

  const updateHireWorkMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ThueCongViecCreateRequest }) =>
      servicesApi.updateThueCongViec(id, data),
    onSuccess: () => {
      toast.success('Hire work updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['thueCongViec'] });
      handleClose();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update hire work');
    }
  });

  const handleInputChange = (field: keyof ThueCongViecCreateRequest, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (formData.maCongViec <= 0) {
      newErrors.maCongViec = 'Job ID must be greater than 0';
    }

    if (formData.maNguoiThue <= 0) {
      newErrors.maNguoiThue = 'Hirer ID must be greater than 0';
    }

    if (!formData.ngayThue.trim()) {
      newErrors.ngayThue = 'Hire date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const submitData = {
      ...formData,
      ngayThue: formData.ngayThue.trim()
    };

    if (editingHireWork) {
      updateHireWorkMutation.mutate({ id: editingHireWork.id, data: submitData });
    } else {
      createHireWorkMutation.mutate(submitData);
    }
  };

  const handleClose = () => {
    setFormData({ id: 0, maCongViec: 0, maNguoiThue: 0, ngayThue: '', hoanThanh: false });
    setErrors({});
    onClose();
  };

  const isSubmitting = createHireWorkMutation.isPending || updateHireWorkMutation.isPending;

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg shadow-xl w-full max-w-md mx-4'>
        <div className='flex items-center justify-between p-6 border-b border-gray-200'>
          <h2 className='text-lg font-semibold text-gray-900'>
            {editingHireWork ? 'Edit Hire Work' : 'Add New Hire Work'}
          </h2>
          <Button variant='ghost' size='sm' onClick={handleClose} className='text-gray-400 hover:text-gray-600'>
            <X className='h-5 w-5' />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className='p-6'>
          <div className='space-y-4'>
            <div>
              <label htmlFor='maCongViec' className='block text-sm font-medium text-gray-700 mb-2'>
                Job ID *
              </label>
              <Input
                id='maCongViec'
                type='number'
                value={formData.maCongViec}
                onChange={(e) => handleInputChange('maCongViec', parseInt(e.target.value) || 0)}
                placeholder='Enter job ID...'
                className={errors.maCongViec ? 'border-red-500' : ''}
                disabled={isSubmitting}
              />
              {errors.maCongViec && <p className='mt-1 text-sm text-red-600'>{errors.maCongViec}</p>}
            </div>

            <div>
              <label htmlFor='maNguoiThue' className='block text-sm font-medium text-gray-700 mb-2'>
                Hirer ID *
              </label>
              <Input
                id='maNguoiThue'
                type='number'
                value={formData.maNguoiThue}
                onChange={(e) => handleInputChange('maNguoiThue', parseInt(e.target.value) || 0)}
                placeholder='Enter hirer ID...'
                className={errors.maNguoiThue ? 'border-red-500' : ''}
                disabled={isSubmitting}
              />
              {errors.maNguoiThue && <p className='mt-1 text-sm text-red-600'>{errors.maNguoiThue}</p>}
            </div>

            <div>
              <label htmlFor='ngayThue' className='block text-sm font-medium text-gray-700 mb-2'>
                Hire Date *
              </label>
              <Input
                id='ngayThue'
                type='text'
                value={formData.ngayThue}
                onChange={(e) => handleInputChange('ngayThue', e.target.value)}
                placeholder='Enter hire date (e.g., 20/04/2025)...'
                className={errors.ngayThue ? 'border-red-500' : ''}
                disabled={isSubmitting}
              />
              {errors.ngayThue && <p className='mt-1 text-sm text-red-600'>{errors.ngayThue}</p>}
            </div>

            <div className='flex items-center space-x-2'>
              <Switch
                checked={formData.hoanThanh}
                onCheckedChange={(checked) => handleInputChange('hoanThanh', checked)}
                disabled={isSubmitting}
              />
              <label className='text-sm font-medium text-gray-700'>Completed</label>
            </div>
          </div>

          <div className='flex items-center justify-end space-x-3 mt-6 pt-4 border-t border-gray-200'>
            <Button type='button' variant='outline' onClick={handleClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type='submit' className='bg-green-600 hover:bg-green-700' disabled={isSubmitting}>
              {isSubmitting ? (
                <div className='flex items-center'>
                  <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                  {editingHireWork ? 'Updating...' : 'Creating...'}
                </div>
              ) : editingHireWork ? (
                'Update Hire Work'
              ) : (
                'Create Hire Work'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
