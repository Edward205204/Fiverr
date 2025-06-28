import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { X, Plus, X as XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import jobsTypeApi from '@/apis/jobs-type.api';
import { JobTypeDetail, CreateJobTypeGroupRequest, UpdateJobTypeGroupRequest } from '@/@types/jobs-type';
import { toast } from 'react-toastify';

interface JobTypeGroupFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingGroup?: JobTypeDetail | null;
}

export default function JobTypeGroupFormModal({ isOpen, onClose, editingGroup }: JobTypeGroupFormModalProps) {
  const [formData, setFormData] = useState<CreateJobTypeGroupRequest>({
    id: 0,
    tenChiTiet: '',
    maLoaiCongViec: 0,
    danhSachChiTiet: []
  });
  const [newDetailItem, setNewDetailItem] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const queryClient = useQueryClient();

  const { data: jobTypesData } = useQuery({
    queryKey: ['jobTypes'],
    queryFn: () => jobsTypeApi.getJobTypes({ pageIndex: 1, pageSize: 100 }),
    enabled: isOpen
  });

  const jobTypes = jobTypesData?.data.content.data || [];

  useEffect(() => {
    if (isOpen) {
      if (editingGroup) {
        setFormData({
          id: editingGroup.id,
          tenChiTiet: editingGroup.tenNhom,
          maLoaiCongViec: editingGroup.maLoaiCongviec,
          danhSachChiTiet: editingGroup.dsChiTietLoai.map((item) => item.tenChiTiet)
        });
      } else {
        setFormData({
          id: 0,
          tenChiTiet: '',
          maLoaiCongViec: 0,
          danhSachChiTiet: []
        });
      }
      setNewDetailItem('');
      setErrors({});
    }
  }, [isOpen, editingGroup]);

  const createJobTypeGroupMutation = useMutation({
    mutationFn: (data: CreateJobTypeGroupRequest) => jobsTypeApi.createJobTypeGroup(data),
    onSuccess: () => {
      toast.success('Job type group created successfully!');
      queryClient.invalidateQueries({ queryKey: ['jobTypeDetails'] });
      handleClose();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create job type group');
    }
  });

  const updateJobTypeGroupMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateJobTypeGroupRequest }) =>
      jobsTypeApi.updateJobTypeGroup(id, data),
    onSuccess: () => {
      toast.success('Job type group updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['jobTypeDetails'] });
      handleClose();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update job type group');
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleAddDetailItem = () => {
    if (!newDetailItem.trim()) return;

    if (formData.danhSachChiTiet.includes(newDetailItem.trim())) {
      toast.error('This detail item already exists');
      return;
    }

    setFormData((prev) => ({
      ...prev,
      danhSachChiTiet: [...prev.danhSachChiTiet, newDetailItem.trim()]
    }));
    setNewDetailItem('');
  };

  const handleRemoveDetailItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      danhSachChiTiet: prev.danhSachChiTiet.filter((_, i) => i !== index)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddDetailItem();
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.tenChiTiet.trim()) {
      newErrors.tenChiTiet = 'Group name is required';
    } else if (formData.tenChiTiet.trim().length < 2) {
      newErrors.tenChiTiet = 'Group name must be at least 2 characters';
    } else if (formData.tenChiTiet.trim().length > 100) {
      newErrors.tenChiTiet = 'Group name must be less than 100 characters';
    }

    if (!formData.maLoaiCongViec) {
      newErrors.maLoaiCongViec = 'Please select a job type';
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
      tenChiTiet: formData.tenChiTiet.trim()
    };

    if (editingGroup) {
      updateJobTypeGroupMutation.mutate({ id: editingGroup.id, data: submitData });
    } else {
      createJobTypeGroupMutation.mutate(submitData);
    }
  };

  const handleClose = () => {
    setFormData({ id: 0, tenChiTiet: '', maLoaiCongViec: 0, danhSachChiTiet: [] });
    setNewDetailItem('');
    setErrors({});
    onClose();
  };

  const isSubmitting = createJobTypeGroupMutation.isPending || updateJobTypeGroupMutation.isPending;

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden'>
        <div className='flex items-center justify-between p-6 border-b border-gray-200'>
          <h2 className='text-lg font-semibold text-gray-900'>
            {editingGroup ? 'Edit Job Type Group' : 'Add New Job Type Group'}
          </h2>
          <Button variant='ghost' size='sm' onClick={handleClose} className='text-gray-400 hover:text-gray-600'>
            <X className='h-5 w-5' />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className='p-6 overflow-y-auto max-h-[calc(90vh-120px)]'>
          <div className='space-y-4'>
            <div>
              <label htmlFor='tenChiTiet' className='block text-sm font-medium text-gray-700 mb-2'>
                Group Name *
              </label>
              <Input
                id='tenChiTiet'
                name='tenChiTiet'
                type='text'
                value={formData.tenChiTiet}
                onChange={handleInputChange}
                placeholder='Enter group name...'
                className={errors.tenChiTiet ? 'border-red-500' : ''}
                disabled={isSubmitting}
              />
              {errors.tenChiTiet && <p className='mt-1 text-sm text-red-600'>{errors.tenChiTiet}</p>}
            </div>

            <div>
              <label htmlFor='maLoaiCongViec' className='block text-sm font-medium text-gray-700 mb-2'>
                Job Type *
              </label>
              <select
                id='maLoaiCongViec'
                name='maLoaiCongViec'
                value={formData.maLoaiCongViec}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.maLoaiCongViec ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isSubmitting}
              >
                <option value={0}>Select a job type</option>
                {jobTypes.map((jobType) => (
                  <option key={jobType.id} value={jobType.id}>
                    {jobType.tenLoaiCongViec}
                  </option>
                ))}
              </select>
              {errors.maLoaiCongViec && <p className='mt-1 text-sm text-red-600'>{errors.maLoaiCongViec}</p>}
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Detail Items</label>

              <div className='flex gap-2 mb-3'>
                <Input
                  type='text'
                  value={newDetailItem}
                  onChange={(e) => setNewDetailItem(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder='Enter detail item name...'
                  disabled={isSubmitting}
                />
                <Button
                  type='button'
                  onClick={handleAddDetailItem}
                  disabled={!newDetailItem.trim() || isSubmitting}
                  className='bg-green-600 hover:bg-green-700'
                >
                  <Plus className='w-4 h-4' />
                </Button>
              </div>

              {formData.danhSachChiTiet.length > 0 && (
                <div className='space-y-2'>
                  {formData.danhSachChiTiet.map((item, index) => (
                    <div key={index} className='flex items-center justify-between bg-gray-50 rounded px-3 py-2'>
                      <span className='text-sm text-gray-700'>{item}</span>
                      <Button
                        type='button'
                        variant='ghost'
                        size='sm'
                        onClick={() => handleRemoveDetailItem(index)}
                        disabled={isSubmitting}
                        className='text-red-600 hover:text-red-900'
                      >
                        <XIcon className='w-4 h-4' />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
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
                  {editingGroup ? 'Updating...' : 'Creating...'}
                </div>
              ) : editingGroup ? (
                'Update Group'
              ) : (
                'Create Group'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
