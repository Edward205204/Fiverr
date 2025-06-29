import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import jobApi from '@/apis/job.api';
import { toast } from 'react-toastify';
import { X } from 'lucide-react';
import { useContext, useEffect, useRef, useState } from 'react';
import type { Job } from '@/@types/jobs';
import { AppContext } from '@/contexts/app.context';
import { User } from '@/@types/user';

interface JobFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Job;
  mode: 'add' | 'edit';
}

export default function JobFormModal({ isOpen, onClose, initialData, mode }: JobFormModalProps) {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.hinhAnh || null);
  const { profile } = useContext(AppContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<Job>({
    defaultValues: initialData || {
      id: 0,
      tenCongViec: '',
      danhGia: 0,
      giaTien: 0,
      nguoiTao: (profile as User).id,
      hinhAnh: '',
      moTa: '',
      maChiTietLoaiCongViec: 0,
      moTaNgan: '',
      saoCongViec: 0
    }
  });

  useEffect(() => {
    if (isOpen) {
      reset(
        initialData || {
          id: 0,
          tenCongViec: '',
          danhGia: 0,
          giaTien: 0,
          nguoiTao: (profile as User).id,
          hinhAnh: '',
          moTa: '',
          maChiTietLoaiCongViec: 0,
          moTaNgan: '',
          saoCongViec: 0
        }
      );
      setImagePreview(initialData?.hinhAnh || null);
    }
  }, [isOpen, initialData, reset, profile]);

  const mutation = useMutation({
    mutationFn: async (data: Job) => {
      let jobRes;
      if (mode === 'add') {
        jobRes = await jobApi.createJob(data);
      } else if (initialData) {
        jobRes = await jobApi.updateJob(initialData.id, data);
      } else {
        throw new Error('Missing initialData for edit mode');
      }
      if (fileInputRef.current && fileInputRef.current.files && fileInputRef.current.files[0]) {
        const formData = new FormData();
        formData.append('formFile', fileInputRef.current.files[0]);
        await jobApi.uploadJobImage(jobRes.data.content.id, formData);
      }
      return jobRes;
    },
    onSuccess: () => {
      toast.success(mode === 'add' ? 'Job created successfully!' : 'Job updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      onClose();
    },
    onError: () => {
      toast.error('Failed to submit job');
    }
  });

  const onSubmit = (data: Job) => {
    mutation.mutate(data);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-xl shadow-2xl border border-gray-200 max-w-lg w-full'>
        <div className='flex items-center justify-between p-4 border-b border-gray-100'>
          <h2 className='text-lg font-semibold text-gray-900'>{mode === 'add' ? 'Add Job' : 'Edit Job'}</h2>
          <Button variant='ghost' size='sm' onClick={onClose} className='text-gray-400 hover:text-gray-600 h-8 w-8 p-0'>
            <X className='h-4 w-4' />
          </Button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='p-4 space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Job Name</label>
            <input
              type='text'
              {...register('tenCongViec', { required: 'Required' })}
              className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm'
            />
            {errors.tenCongViec && <p className='text-xs text-red-500 mt-1'>{errors.tenCongViec.message as string}</p>}
          </div>
          <div className='grid grid-cols-2 gap-2'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Price</label>
              <input
                type='number'
                {...register('giaTien', { required: 'Required', min: 0 })}
                className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm'
              />
              {errors.giaTien && <p className='text-xs text-red-500 mt-1'>{errors.giaTien.message as string}</p>}
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Rating</label>
              <input
                type='number'
                {...register('saoCongViec', { required: 'Required', min: 0, max: 5 })}
                className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm'
              />
              {errors.saoCongViec && (
                <p className='text-xs text-red-500 mt-1'>{errors.saoCongViec.message as string}</p>
              )}
            </div>
          </div>
          <div className='grid grid-cols-2 gap-2'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Category Detail ID</label>
              <input
                type='number'
                {...register('maChiTietLoaiCongViec', { required: 'Required', min: 0 })}
                className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm'
              />
              {errors.maChiTietLoaiCongViec && (
                <p className='text-xs text-red-500 mt-1'>{errors.maChiTietLoaiCongViec.message as string}</p>
              )}
            </div>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Short Description</label>
            <textarea
              {...register('moTaNgan', { required: 'Required' })}
              className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm'
              rows={2}
            />
            {errors.moTaNgan && <p className='text-xs text-red-500 mt-1'>{errors.moTaNgan.message as string}</p>}
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Description</label>
            <textarea
              {...register('moTa', { required: 'Required' })}
              className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm'
              rows={3}
            />
            {errors.moTa && <p className='text-xs text-red-500 mt-1'>{errors.moTa.message as string}</p>}
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Image</label>
            <div className='flex items-center gap-4 mt-1'>
              <Button
                type='button'
                variant='outline'
                className='px-4 py-2 text-sm font-medium border border-gray-300 rounded-md shadow-sm hover:bg-gray-100'
                onClick={() => fileInputRef.current?.click()}
              >
                {imagePreview ? 'Change Image' : 'Upload Image'}
              </Button>
              <input type='file' accept='image/*' ref={fileInputRef} onChange={handleFileChange} className='hidden' />
              {imagePreview && (
                <img src={imagePreview} alt='Preview' className='h-16 w-16 rounded object-cover border' />
              )}
            </div>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Review</label>
            <input
              type='number'
              {...register('danhGia', { required: 'Required', min: 0 })}
              className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm'
            />
            {errors.danhGia && <p className='text-xs text-red-500 mt-1'>{errors.danhGia.message as string}</p>}
          </div>
          <div className='flex justify-end pt-2'>
            <Button type='button' variant='outline' className='mr-2' onClick={onClose}>
              Cancel
            </Button>
            <Button type='submit' disabled={isSubmitting || mutation.isPending}>
              {mode === 'add' ? 'Add Job' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
