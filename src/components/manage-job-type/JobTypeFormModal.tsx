import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import jobsTypeApi from '@/apis/jobs-type.api';
import { JobType, CreateJobTypeRequest } from '@/@types/jobs-type';
import { toast } from 'react-toastify';

interface JobTypeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingJobType?: JobType | null;
}

export default function JobTypeFormModal({ isOpen, onClose, editingJobType }: JobTypeFormModalProps) {
  const [formData, setFormData] = useState<CreateJobTypeRequest>({
    id: 0,
    tenLoaiCongViec: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isOpen) {
      if (editingJobType) {
        setFormData({
          id: editingJobType.id,
          tenLoaiCongViec: editingJobType.tenLoaiCongViec
        });
      } else {
        setFormData({
          id: 0,
          tenLoaiCongViec: ''
        });
      }
      setErrors({});
    }
  }, [isOpen, editingJobType]);

  const createJobTypeMutation = useMutation({
    mutationFn: (data: CreateJobTypeRequest) => jobsTypeApi.createJobType(data),
    onSuccess: () => {
      toast.success('Job type created successfully!');
      queryClient.invalidateQueries({ queryKey: ['jobTypes'] });
      handleClose();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create job type');
    }
  });

  const updateJobTypeMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: CreateJobTypeRequest }) => jobsTypeApi.updateJobType(id, data),
    onSuccess: () => {
      toast.success('Job type updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['jobTypes'] });
      handleClose();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update job type');
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.tenLoaiCongViec.trim()) {
      newErrors.tenLoaiCongViec = 'Job type name is required';
    } else if (formData.tenLoaiCongViec.trim().length < 2) {
      newErrors.tenLoaiCongViec = 'Job type name must be at least 2 characters';
    } else if (formData.tenLoaiCongViec.trim().length > 100) {
      newErrors.tenLoaiCongViec = 'Job type name must be less than 100 characters';
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
      tenLoaiCongViec: formData.tenLoaiCongViec.trim()
    };

    if (editingJobType) {
      updateJobTypeMutation.mutate({ id: editingJobType.id, data: submitData });
    } else {
      createJobTypeMutation.mutate(submitData);
    }
  };

  const handleClose = () => {
    setFormData({ id: 0, tenLoaiCongViec: '' });
    setErrors({});
    onClose();
  };

  const isSubmitting = createJobTypeMutation.isPending || updateJobTypeMutation.isPending;

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg shadow-xl w-full max-w-md mx-4'>
        <div className='flex items-center justify-between p-6 border-b border-gray-200'>
          <h2 className='text-lg font-semibold text-gray-900'>
            {editingJobType ? 'Edit Job Type' : 'Add New Job Type'}
          </h2>
          <Button variant='ghost' size='sm' onClick={handleClose} className='text-gray-400 hover:text-gray-600'>
            <X className='h-5 w-5' />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className='p-6'>
          <div className='space-y-4'>
            <div>
              <label htmlFor='tenLoaiCongViec' className='block text-sm font-medium text-gray-700 mb-2'>
                Job Type Name *
              </label>
              <Input
                id='tenLoaiCongViec'
                name='tenLoaiCongViec'
                type='text'
                value={formData.tenLoaiCongViec}
                onChange={handleInputChange}
                placeholder='Enter job type name...'
                className={errors.tenLoaiCongViec ? 'border-red-500' : ''}
                disabled={isSubmitting}
              />
              {errors.tenLoaiCongViec && <p className='mt-1 text-sm text-red-600'>{errors.tenLoaiCongViec}</p>}
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
                  {editingJobType ? 'Updating...' : 'Creating...'}
                </div>
              ) : editingJobType ? (
                'Update Job Type'
              ) : (
                'Create Job Type'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
