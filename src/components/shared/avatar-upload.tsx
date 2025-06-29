import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import userApi from '@/apis/user.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

interface AvatarUploadProps {
  currentAvatar: string;
  userId: number;
  onAvatarChange: (newAvatar: string) => void;
}

export default function AvatarUpload({ currentAvatar, userId, onAvatarChange }: AvatarUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const uploadAvatarMutation = useMutation({
    mutationFn: (file: File) => userApi.uploadAvatar(file, userId),
    onSuccess: (response) => {
      const newAvatarUrl = response.data?.content || response.data;
      onAvatarChange(newAvatarUrl);
      queryClient.invalidateQueries({ queryKey: ['user', userId] });
      toast.success('Avatar updated successfully!');
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{ content: string; message: string }>;
      const errorMessage =
        axiosError.response?.data?.content ||
        axiosError.response?.data?.message ||
        'An error occurred while updating avatar!';
      toast.error(errorMessage);
    },
    onSettled: () => {
      setIsUploading(false);
    }
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file!');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error('File too large! Please select a file smaller than 5MB.');
        return;
      }

      setIsUploading(true);
      uploadAvatarMutation.mutate(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className='relative'>
      <div className='relative w-[100px] h-[100px] rounded-full bg-gray-300 flex items-center justify-center text-white text-2xl font-semibold overflow-hidden'>
        {currentAvatar ? (
          <img src={currentAvatar} alt='Avatar' className='w-full h-full object-cover' />
        ) : (
          <span>U</span>
        )}
        {isUploading && (
          <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
            <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-white'></div>
          </div>
        )}
      </div>

      <Button
        size='sm'
        variant='outline'
        onClick={handleUploadClick}
        disabled={isUploading}
        className='absolute -bottom-2 -right-2 w-8 h-8 p-0 rounded-full'
      >
        📷
      </Button>

      <input ref={fileInputRef} type='file' accept='image/*' onChange={handleFileSelect} className='hidden' />
    </div>
  );
}
