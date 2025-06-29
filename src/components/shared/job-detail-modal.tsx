import { useQuery } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import jobApi from '@/apis/job.api';

interface JobDetailModalProps {
  jobId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function JobDetailModal({ jobId, isOpen, onClose }: JobDetailModalProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['job', jobId],
    queryFn: () => jobApi.getJobById(jobId!),
    enabled: !!jobId && isOpen
  });

  const job = data?.data.content as unknown;

  let j: {
    id: number;
    tenCongViec: string;
    danhGia: number;
    giaTien: number;
    nguoiTao: number;
    hinhAnh: string;
    moTa: string;
    maChiTietLoaiCongViec: number;
    moTaNgan: string;
    saoCongViec: number;
  } | null = null;
  if (job) {
    j = job as {
      id: number;
      tenCongViec: string;
      danhGia: number;
      giaTien: number;
      nguoiTao: number;
      hinhAnh: string;
      moTa: string;
      maChiTietLoaiCongViec: number;
      moTaNgan: string;
      saoCongViec: number;
    };
  }

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50 p-2'>
      <div className='bg-white rounded-xl shadow-2xl border border-gray-200 max-w-[1400px] w-[95vw] max-h-[90vh] flex flex-col'>
        <div className='flex items-center justify-between px-8 py-4 border-b border-gray-100'>
          <h2 className='text-3xl font-bold text-gray-900'>Job Details</h2>
          <Button variant='ghost' size='sm' onClick={onClose} className='text-gray-400 hover:text-gray-600 h-8 w-8 p-0'>
            <X className='h-6 w-6' />
          </Button>
        </div>
        <div className='flex-1 overflow-y-auto px-10 py-4'>
          {isLoading && (
            <div className='flex items-center justify-center py-10'>
              <div className='animate-spin rounded-full h-10 w-10 border-b-2 border-green-500'></div>
            </div>
          )}
          {error && (
            <div className='text-center py-10'>
              <p className='text-red-500 text-xl'>Có lỗi xảy ra khi tải thông tin công việc</p>
            </div>
          )}
          {j && (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-start'>
              <div className='flex flex-col items-center md:items-start gap-6'>
                <div className='flex-shrink-0'>
                  {j.hinhAnh ? (
                    <img
                      className='h-40 w-40 rounded object-cover border-2 border-gray-100'
                      src={j.hinhAnh}
                      alt={j.tenCongViec}
                    />
                  ) : (
                    <div className='h-40 w-40 rounded bg-green-500 flex items-center justify-center border-2 border-gray-100'>
                      <span className='text-white font-bold text-4xl'>{j.tenCongViec.charAt(0).toUpperCase()}</span>
                    </div>
                  )}
                </div>
                <div className='w-full'>
                  <h3 className='text-2xl font-bold text-gray-900 mb-2 text-center md:text-left'>{j.tenCongViec}</h3>
                  <div className='flex flex-wrap items-center gap-4 justify-center md:justify-start mb-2'>
                    <span className='text-yellow-600 font-bold text-xl'>{j.saoCongViec}★</span>
                    <span className='text-green-700 font-semibold text-xl'>${j.giaTien}</span>
                    <span className='text-gray-500 text-lg'>ID: {j.id}</span>
                  </div>
                  <div className='text-lg text-gray-700 space-y-1 mb-2'>
                    <div>
                      Creator: <span className='font-medium'>{j.nguoiTao}</span>
                    </div>
                    <div>
                      Category ID: <span className='font-medium'>{j.maChiTietLoaiCongViec}</span>
                    </div>
                    <div>
                      Rating: <span className='font-medium'>{j.danhGia}</span>
                    </div>
                  </div>
                  <div className='bg-gray-50 rounded-lg p-4'>
                    <h4 className='text-lg font-semibold text-gray-900 mb-2'>Short Description</h4>
                    <p className='text-gray-700 text-base whitespace-pre-line'>{j.moTaNgan}</p>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-6'>
                <div className='bg-gray-50 rounded-lg p-4 h-full'>
                  <h4 className='text-lg font-semibold text-gray-900 mb-2'>Description</h4>
                  <p className='text-gray-700 text-base whitespace-pre-line'>{j.moTa}</p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className='flex justify-end px-8 py-4 border-t border-gray-100'>
          <Button variant='outline' size='lg' onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
