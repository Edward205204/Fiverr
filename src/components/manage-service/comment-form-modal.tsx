import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import servicesApi from '@/apis/services.api';
import { BinhLuan, BinhLuanCreateRequest } from '@/@types/services';
import { toast } from 'react-toastify';

interface CommentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingComment?: BinhLuan | null;
}

export default function CommentFormModal({ isOpen, onClose, editingComment }: CommentFormModalProps) {
  const [formData, setFormData] = useState<BinhLuanCreateRequest>({
    id: 0,
    maCongViec: 0,
    maNguoiBinhLuan: 0,
    ngayBinhLuan: '',
    noiDung: '',
    saoBinhLuan: 0
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isOpen) {
      if (editingComment) {
        setFormData({
          id: editingComment.id,
          maCongViec: editingComment.maCongViec,
          maNguoiBinhLuan: editingComment.maNguoiBinhLuan,
          ngayBinhLuan: editingComment.ngayBinhLuan,
          noiDung: editingComment.noiDung,
          saoBinhLuan: editingComment.saoBinhLuan
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
      setErrors({});
    }
  }, [isOpen, editingComment]);

  const createCommentMutation = useMutation({
    mutationFn: (data: BinhLuanCreateRequest) => servicesApi.createBinhLuan(data),
    onSuccess: () => {
      toast.success('Comment created successfully!');
      queryClient.invalidateQueries({ queryKey: ['binhLuan'] });
      handleClose();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create comment');
    }
  });

  const updateCommentMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: BinhLuanCreateRequest }) => servicesApi.updateBinhLuan(id, data),
    onSuccess: () => {
      toast.success('Comment updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['binhLuan'] });
      handleClose();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update comment');
    }
  });

  const handleInputChange = (field: keyof BinhLuanCreateRequest, value: string | number) => {
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

    if (formData.maNguoiBinhLuan <= 0) {
      newErrors.maNguoiBinhLuan = 'Commenter ID must be greater than 0';
    }

    if (!formData.noiDung.trim()) {
      newErrors.noiDung = 'Content is required';
    } else if (formData.noiDung.trim().length < 2) {
      newErrors.noiDung = 'Content must be at least 2 characters';
    }

    if (formData.saoBinhLuan < 1 || formData.saoBinhLuan > 5) {
      newErrors.saoBinhLuan = 'Rating must be between 1 and 5';
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
      noiDung: formData.noiDung.trim()
    };

    if (editingComment) {
      updateCommentMutation.mutate({ id: editingComment.id, data: submitData });
    } else {
      createCommentMutation.mutate(submitData);
    }
  };

  const handleClose = () => {
    setFormData({ id: 0, maCongViec: 0, maNguoiBinhLuan: 0, ngayBinhLuan: '', noiDung: '', saoBinhLuan: 0 });
    setErrors({});
    onClose();
  };

  const isSubmitting = createCommentMutation.isPending || updateCommentMutation.isPending;

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg shadow-xl w-full max-w-md mx-4'>
        <div className='flex items-center justify-between p-6 border-b border-gray-200'>
          <h2 className='text-lg font-semibold text-gray-900'>{editingComment ? 'Edit Comment' : 'Add New Comment'}</h2>
          <Button variant='ghost' size='sm' onClick={handleClose} className='text-gray-400 hover:text-gray-600'>
            <X className='h-5 w-5' />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className='p-6'>
          <div className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
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
                <label htmlFor='maNguoiBinhLuan' className='block text-sm font-medium text-gray-700 mb-2'>
                  Commenter ID *
                </label>
                <Input
                  id='maNguoiBinhLuan'
                  type='number'
                  value={formData.maNguoiBinhLuan}
                  onChange={(e) => handleInputChange('maNguoiBinhLuan', parseInt(e.target.value) || 0)}
                  placeholder='Enter commenter ID...'
                  className={errors.maNguoiBinhLuan ? 'border-red-500' : ''}
                  disabled={isSubmitting}
                />
                {errors.maNguoiBinhLuan && <p className='mt-1 text-sm text-red-600'>{errors.maNguoiBinhLuan}</p>}
              </div>
            </div>

            <div>
              <label htmlFor='ngayBinhLuan' className='block text-sm font-medium text-gray-700 mb-2'>
                Comment Date
              </label>
              <Input
                id='ngayBinhLuan'
                type='text'
                value={formData.ngayBinhLuan}
                onChange={(e) => handleInputChange('ngayBinhLuan', e.target.value)}
                placeholder='Enter comment date (e.g., 20/04/2025)...'
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor='saoBinhLuan' className='block text-sm font-medium text-gray-700 mb-2'>
                Rating *
              </label>
              <Input
                id='saoBinhLuan'
                type='number'
                min='1'
                max='5'
                value={formData.saoBinhLuan}
                onChange={(e) => handleInputChange('saoBinhLuan', parseInt(e.target.value) || 0)}
                placeholder='Enter rating (1-5)...'
                className={errors.saoBinhLuan ? 'border-red-500' : ''}
                disabled={isSubmitting}
              />
              {errors.saoBinhLuan && <p className='mt-1 text-sm text-red-600'>{errors.saoBinhLuan}</p>}
            </div>

            <div>
              <label htmlFor='noiDung' className='block text-sm font-medium text-gray-700 mb-2'>
                Content *
              </label>
              <textarea
                id='noiDung'
                value={formData.noiDung}
                onChange={(e) => handleInputChange('noiDung', e.target.value)}
                placeholder='Enter comment content...'
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.noiDung ? 'border-red-500' : ''
                }`}
                rows={4}
                disabled={isSubmitting}
              />
              {errors.noiDung && <p className='mt-1 text-sm text-red-600'>{errors.noiDung}</p>}
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
                  {editingComment ? 'Updating...' : 'Creating...'}
                </div>
              ) : editingComment ? (
                'Update Comment'
              ) : (
                'Create Comment'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
