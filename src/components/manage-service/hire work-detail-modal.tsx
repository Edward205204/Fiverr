import { useQuery } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import servicesApi from '@/apis/services.api';
import { ThueCongViec } from '@/@types/services';

interface ThueCongViecDetailModalProps {
  thueCongViecId: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function HireWorkDetailModal({ thueCongViecId, isOpen, onClose }: ThueCongViecDetailModalProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['thueCongViec', thueCongViecId],
    queryFn: () => servicesApi.getThueCongViecById(thueCongViecId),
    enabled: isOpen && thueCongViecId > 0
  });

  const thueCongViec: ThueCongViec | undefined = data?.data.content;

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto'>
        <div className='flex items-center justify-between p-6 border-b border-gray-200'>
          <h2 className='text-xl font-semibold text-gray-900'>Chi tiết thuê công việc</h2>
          <Button variant='ghost' size='sm' onClick={onClose} className='text-gray-400 hover:text-gray-600'>
            <X className='h-5 w-5' />
          </Button>
        </div>

        <div className='p-6'>
          {isLoading && (
            <div className='flex items-center justify-center py-8'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-green-500'></div>
            </div>
          )}

          {error && (
            <div className='text-center py-8'>
              <p className='text-red-500'>Có lỗi xảy ra khi tải dữ liệu</p>
            </div>
          )}

          {thueCongViec && (
            <div className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>ID</label>
                  <p className='text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border'>{thueCongViec.id}</p>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Mã công việc</label>
                  <p className='text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border'>{thueCongViec.maCongViec}</p>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Mã người thuê</label>
                  <p className='text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border'>
                    {thueCongViec.maNguoiThue}
                  </p>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Ngày thuê</label>
                  <p className='text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border'>
                    {thueCongViec.ngayThue || 'Chưa có ngày'}
                  </p>
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Trạng thái hoàn thành</label>
                <span
                  className={`inline-flex px-3 py-2 text-sm font-semibold rounded-full ${
                    thueCongViec.hoanThanh ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {thueCongViec.hoanThanh ? 'Hoàn thành' : 'Chưa hoàn thành'}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className='flex justify-end gap-3 p-6 border-t border-gray-200'>
          <Button variant='outline' onClick={onClose}>
            Đóng
          </Button>
        </div>
      </div>
    </div>
  );
}
