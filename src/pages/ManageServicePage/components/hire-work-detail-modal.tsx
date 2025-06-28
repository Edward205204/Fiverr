import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThueCongViec } from '@/@types/services';

interface HireWorkDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  hireWork: ThueCongViec | null;
}

export default function HireWorkDetailModal({ isOpen, onClose, hireWork }: HireWorkDetailModalProps) {
  if (!isOpen || !hireWork) return null;

  return (
    <div className='fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg shadow-xl w-full max-w-md mx-4'>
        <div className='flex items-center justify-between p-6 border-b border-gray-200'>
          <h2 className='text-lg font-semibold text-gray-900'>Hire Work Details</h2>
          <Button variant='ghost' size='sm' onClick={onClose} className='text-gray-400 hover:text-gray-600'>
            <X className='h-5 w-5' />
          </Button>
        </div>

        <div className='p-6'>
          <div className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>ID</label>
                <p className='text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border'>#{hireWork.id}</p>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Job ID</label>
                <p className='text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border'>{hireWork.maCongViec}</p>
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Hirer ID</label>
                <p className='text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border'>{hireWork.maNguoiThue}</p>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Hire Date</label>
                <p className='text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border'>
                  {hireWork.ngayThue || 'N/A'}
                </p>
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Status</label>
              <span
                className={`inline-flex px-3 py-2 text-sm font-semibold rounded-full ${
                  hireWork.hoanThanh ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {hireWork.hoanThanh ? 'Completed' : 'Pending'}
              </span>
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
