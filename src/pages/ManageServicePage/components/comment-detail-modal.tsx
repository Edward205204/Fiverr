import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BinhLuan } from '@/@types/services';

interface CommentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  comment: BinhLuan | null;
}

export default function CommentDetailModal({ isOpen, onClose, comment }: CommentDetailModalProps) {
  if (!isOpen || !comment) return null;

  return (
    <div className='fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg shadow-xl w-full max-w-md mx-4'>
        <div className='flex items-center justify-between p-6 border-b border-gray-200'>
          <h2 className='text-lg font-semibold text-gray-900'>Comment Details</h2>
          <Button variant='ghost' size='sm' onClick={onClose} className='text-gray-400 hover:text-gray-600'>
            <X className='h-5 w-5' />
          </Button>
        </div>

        <div className='p-6'>
          <div className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>ID</label>
                <p className='text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border'>#{comment.id}</p>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Job ID</label>
                <p className='text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border'>{comment.maCongViec}</p>
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Commenter ID</label>
                <p className='text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border'>{comment.maNguoiBinhLuan}</p>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Rating</label>
                <p className='text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border'>
                  <span className='text-yellow-600 font-bold'>{comment.saoBinhLuan}★</span>
                </p>
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Comment Date</label>
              <p className='text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border'>{comment.ngayBinhLuan}</p>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Content</label>
              <p className='text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border min-h-[60px]'>
                {comment.noiDung}
              </p>
            </div>
          </div>
        </div>

        <div className='flex justify-end gap-3 p-6 border-t border-gray-200'>
          <Button variant='outline' onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
