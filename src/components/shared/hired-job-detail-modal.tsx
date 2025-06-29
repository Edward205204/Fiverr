import { HiredJob } from '@/@types/user';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import servicesApi from '@/apis/services.api';
import { ThueCongViecCreateRequest } from '@/@types/services';

interface HiredJobDetailModalProps {
  hiredJob: HiredJob | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function HiredJobDetailModal({ hiredJob, isOpen, onClose }: HiredJobDetailModalProps) {
  const queryClient = useQueryClient();

  const updateHiredJobMutation = useMutation({
    mutationFn: (data: ThueCongViecCreateRequest) => servicesApi.updateThueCongViec(data.id, data),
    onSuccess: () => {
      alert('Marked as completed successfully!');
      queryClient.invalidateQueries({ queryKey: ['hiredJobs'] });
      onClose();
    },
    onError: () => {
      alert('An error occurred while marking as completed!');
    }
  });

  const handleMarkComplete = () => {
    if (!hiredJob) return;

    const updateData: ThueCongViecCreateRequest = {
      id: hiredJob.id,
      maCongViec: hiredJob.congViec.id,
      maNguoiThue: hiredJob.congViec.nguoiTao, // Giả sử nguoiTao là maNguoiThue
      ngayThue: hiredJob.ngayThue,
      hoanThanh: true
    };

    updateHiredJobMutation.mutate(updateData);
  };

  if (!isOpen || !hiredJob) return null;

  const formatDate = (dateString: string) => {
    if (!dateString || dateString === '0') return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
  };

  return (
    <div className='fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg shadow-xl w-full max-w-6xl h-[85vh] overflow-hidden'>
        <div className='flex h-full'>
          <div className='w-1/3 bg-gray-50 p-6 flex flex-col'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-lg font-semibold'>Job Details</h2>
              <Button variant='outline' size='sm' onClick={onClose}>
                ✕
              </Button>
            </div>

            <div className='flex-1'>
              <div className='w-full h-48 bg-gray-100 overflow-hidden rounded-lg mb-4'>
                <img
                  src={hiredJob.congViec.hinhAnh}
                  alt={hiredJob.congViec.tenCongViec}
                  className='w-full h-full object-cover'
                />
              </div>

              <h3 className='text-lg font-semibold text-gray-800 mb-3'>{hiredJob.congViec.tenCongViec}</h3>

              <div className='space-y-3 text-sm'>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Hired date:</span>
                  <span className='font-medium'>{formatDate(hiredJob.ngayThue)}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Status:</span>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      hiredJob.hoanThanh ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {hiredJob.hoanThanh ? 'Completed' : 'In Progress'}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Price:</span>
                  <span className='font-medium text-green-600'>${hiredJob.congViec.giaTien}</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-600'>Rating:</span>
                  <span className='flex items-center'>
                    <span className='text-yellow-500 mr-1'>{'★'.repeat(hiredJob.congViec.saoCongViec)}</span>
                    <span className='text-sm'>({hiredJob.congViec.danhGia})</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className='w-2/3 flex flex-col'>
            <div className='p-6 overflow-y-auto flex-1'>
              <div className='space-y-6'>
                <div>
                  <h4 className='font-semibold text-gray-800 mb-3'>Detailed Description</h4>
                  <div className='bg-gray-50 p-4 rounded-lg'>
                    <p className='text-gray-700 whitespace-pre-wrap text-sm leading-relaxed'>
                      {hiredJob.congViec.moTa}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className='font-semibold text-gray-800 mb-3'>Short Description</h4>
                  <div className='bg-blue-50 p-4 rounded-lg'>
                    <p className='text-gray-700 whitespace-pre-wrap text-sm leading-relaxed'>
                      {hiredJob.congViec.moTaNgan}
                    </p>
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-6'>
                  <div>
                    <h4 className='font-semibold text-gray-800 mb-3'>Job Information</h4>
                    <div className='space-y-2 text-sm'>
                      <div className='flex justify-between'>
                        <span className='text-gray-600'>Job ID:</span>
                        <span className='font-medium'>#{hiredJob.congViec.id}</span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-gray-600'>Hire ID:</span>
                        <span className='font-medium'>#{hiredJob.id}</span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-gray-600'>Creator:</span>
                        <span className='font-medium'>User #{hiredJob.congViec.nguoiTao}</span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-gray-600'>Category Code:</span>
                        <span className='font-medium'>{hiredJob.congViec.maChiTietLoaiCongViec}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-800 mb-3'>Statistics</h4>
                    <div className='space-y-2 text-sm'>
                      <div className='flex justify-between'>
                        <span className='text-gray-600'>Stars:</span>
                        <span className='font-medium'>{hiredJob.congViec.saoCongViec}/5</span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-gray-600'>Reviews:</span>
                        <span className='font-medium'>{hiredJob.congViec.danhGia}</span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-gray-600'>Price:</span>
                        <span className='font-medium text-green-600'>${hiredJob.congViec.giaTien}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='p-6 border-t bg-white'>
              <div className='flex justify-end gap-2'>
                <Button variant='outline' onClick={onClose}>
                  Close
                </Button>
                {!hiredJob.hoanThanh && (
                  <Button
                    className='bg-green-600 hover:bg-green-700'
                    onClick={handleMarkComplete}
                    disabled={updateHiredJobMutation.isPending}
                  >
                    {updateHiredJobMutation.isPending ? 'Processing...' : 'Mark as Completed'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
