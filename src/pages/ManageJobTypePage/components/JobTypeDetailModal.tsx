import { useQuery } from '@tanstack/react-query';
import { X, Image, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import jobsTypeApi from '@/apis/jobs-type.api';
import { JobType } from '@/@types/jobs-type';

interface JobTypeDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobType: JobType | null;
}

export default function JobTypeDetailModal({ isOpen, onClose, jobType }: JobTypeDetailModalProps) {
  const { data: jobTypeDetails, isLoading } = useQuery({
    queryKey: ['jobTypeDetails', jobType?.id],
    queryFn: () => jobsTypeApi.getJobTypeDetails({ pageIndex: 1, pageSize: 100 }),
    enabled: !!jobType && isOpen
  });

  const jobTypeGroups = jobTypeDetails?.data.content.data.filter((group) => group.maLoaiCongviec === jobType?.id) || [];

  if (!isOpen || !jobType) return null;

  return (
    <div className='fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden'>
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-gray-200'>
          <div>
            <h2 className='text-lg font-semibold text-gray-900'>Job Type Details</h2>
            <p className='text-sm text-gray-500'>
              #{jobType.id} - {jobType.tenLoaiCongViec}
            </p>
          </div>
          <Button variant='ghost' size='sm' onClick={onClose} className='text-gray-400 hover:text-gray-600'>
            <X className='h-5 w-5' />
          </Button>
        </div>

        {/* Content */}
        <div className='p-6 overflow-y-auto max-h-[calc(90vh-120px)]'>
          {/* Job Type Info */}
          <div className='mb-6'>
            <h3 className='text-lg font-medium text-gray-900 mb-4'>Job Type Information</h3>
            <div className='bg-gray-50 rounded-lg p-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>ID</label>
                  <p className='text-sm text-gray-900'>#{jobType.id}</p>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>Name</label>
                  <p className='text-sm text-gray-900'>{jobType.tenLoaiCongViec}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Job Type Groups */}
          <div>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-lg font-medium text-gray-900'>Job Type Groups</h3>
              <div className='flex items-center text-sm text-gray-500'>
                <Layers className='w-4 h-4 mr-1' />
                {jobTypeGroups.length} groups
              </div>
            </div>

            {isLoading ? (
              <div className='flex items-center justify-center h-32'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-green-500'></div>
              </div>
            ) : jobTypeGroups.length > 0 ? (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {jobTypeGroups.map((group) => (
                  <div
                    key={group.id}
                    className='border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow'
                  >
                    {/* Group Header */}
                    <div className='flex items-start justify-between mb-3'>
                      <div className='flex-1'>
                        <h4 className='font-medium text-gray-900 mb-1'>{group.tenNhom}</h4>
                        <p className='text-sm text-gray-500'>ID: #{group.id}</p>
                      </div>
                      {group.hinhAnh && (
                        <div className='ml-3'>
                          <img
                            src={group.hinhAnh}
                            alt={group.tenNhom}
                            className='w-12 h-12 rounded-lg object-cover'
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Group Image */}
                    {group.hinhAnh && (
                      <div className='mb-3'>
                        <div className='flex items-center text-sm text-gray-500 mb-2'>
                          <Image className='w-4 h-4 mr-1' />
                          Group Image
                        </div>
                        <img
                          src={group.hinhAnh}
                          alt={group.tenNhom}
                          className='w-full h-32 object-cover rounded-lg'
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}

                    {/* Detail Items */}
                    <div>
                      <div className='flex items-center text-sm text-gray-500 mb-2'>
                        <Layers className='w-4 h-4 mr-1' />
                        Detail Items ({group.dsChiTietLoai.length})
                      </div>
                      {group.dsChiTietLoai.length > 0 ? (
                        <div className='space-y-1'>
                          {group.dsChiTietLoai.map((item) => (
                            <div
                              key={item.id}
                              className='flex items-center justify-between text-sm bg-gray-50 rounded px-2 py-1'
                            >
                              <span className='text-gray-700'>{item.tenChiTiet}</span>
                              <span className='text-gray-500 text-xs'>#{item.id}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className='text-sm text-gray-400 italic'>No detail items</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='text-center py-8'>
                <div className='text-gray-400 mb-4'>
                  <Layers className='mx-auto h-12 w-12' />
                </div>
                <h3 className='text-lg font-medium text-gray-900 mb-2'>No groups found</h3>
                <p className='text-gray-500'>This job type doesn't have any groups yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className='flex items-center justify-end p-6 border-t border-gray-200'>
          <Button variant='outline' onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
