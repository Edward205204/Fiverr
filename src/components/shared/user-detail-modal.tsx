import { useQuery } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import managerApi from '@/apis/manager.api';

interface UserDetailModalProps {
  userId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function UserDetailModal({ userId, isOpen, onClose }: UserDetailModalProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => managerApi.getUserById(userId!),
    enabled: !!userId && isOpen
  });

  const user = data?.data.content;

  const formatDate = (dateString: string) => {
    if (!dateString || dateString === '0') return 'N/A';
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const formatGender = (gender: boolean) => {
    return gender ? 'Nam' : 'Nữ';
  };

  const formatRole = (role: string) => {
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          role === 'ADMIN' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
        }`}
      >
        {role}
      </span>
    );
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-xl shadow-2xl border border-gray-200 max-w-lg w-full'>
        {/* Header */}
        <div className='flex items-center justify-between p-4 border-b border-gray-100'>
          <h2 className='text-lg font-semibold text-gray-900'>User Details</h2>
          <Button variant='ghost' size='sm' onClick={onClose} className='text-gray-400 hover:text-gray-600 h-8 w-8 p-0'>
            <X className='h-4 w-4' />
          </Button>
        </div>

        {/* Content */}
        <div className='p-4'>
          {isLoading && (
            <div className='flex items-center justify-center py-6'>
              <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-green-500'></div>
            </div>
          )}

          {error && (
            <div className='text-center py-6'>
              <p className='text-red-500 text-sm'>Có lỗi xảy ra khi tải thông tin user</p>
            </div>
          )}

          {user && (
            <div className='space-y-4'>
              {/* Avatar and Basic Info */}
              <div className='flex items-center space-x-4'>
                <div className='flex-shrink-0'>
                  {user.avatar ? (
                    <img
                      className='h-16 w-16 rounded-full object-cover border-2 border-gray-100'
                      src={user.avatar}
                      alt={user.name}
                    />
                  ) : (
                    <div className='h-16 w-16 rounded-full bg-green-500 flex items-center justify-center border-2 border-gray-100'>
                      <span className='text-white font-bold text-lg'>{user.name.charAt(0).toUpperCase()}</span>
                    </div>
                  )}
                </div>
                <div className='flex-1'>
                  <h3 className='text-lg font-bold text-gray-900'>{user.name}</h3>
                  <div className='flex items-center space-x-3 mt-1'>
                    {formatRole(user.role)}
                    <span className='text-gray-500 text-sm'>{formatGender(user.gender)}</span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className='bg-gray-50 rounded-lg p-3'>
                <h4 className='text-sm font-semibold text-gray-900 mb-2'>Contact Information</h4>
                <div className='space-y-1 text-sm'>
                  <div className='flex justify-between'>
                    <span className='text-gray-500'>Email:</span>
                    <span className='text-gray-900'>{user.email}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-500'>Phone:</span>
                    <span className='text-gray-900'>{user.phone || 'N/A'}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-500'>Birthday:</span>
                    <span className='text-gray-900'>{formatDate(user.birthday)}</span>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className='bg-gray-50 rounded-lg p-3'>
                <h4 className='text-sm font-semibold text-gray-900 mb-2'>Skills</h4>
                {user.skill && user.skill.length > 0 ? (
                  <div className='flex flex-wrap gap-1'>
                    {user.skill.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800'
                      >
                        {skill}
                      </span>
                    ))}
                    {user.skill.length > 3 && (
                      <span className='text-gray-500 text-xs'>+{user.skill.length - 3} more</span>
                    )}
                  </div>
                ) : (
                  <p className='text-gray-500 text-sm'>No skills listed</p>
                )}
              </div>

              {/* Certifications */}
              <div className='bg-gray-50 rounded-lg p-3'>
                <h4 className='text-sm font-semibold text-gray-900 mb-2'>Certifications</h4>
                {user.certification && user.certification.length > 0 ? (
                  <div className='flex flex-wrap gap-1'>
                    {user.certification.slice(0, 3).map((cert, index) => (
                      <span
                        key={index}
                        className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800'
                      >
                        {cert}
                      </span>
                    ))}
                    {user.certification.length > 3 && (
                      <span className='text-gray-500 text-xs'>+{user.certification.length - 3} more</span>
                    )}
                  </div>
                ) : (
                  <p className='text-gray-500 text-sm'>No certifications listed</p>
                )}
              </div>

              {/* Booking Jobs */}
              <div className='bg-gray-50 rounded-lg p-3'>
                <h4 className='text-sm font-semibold text-gray-900 mb-2'>Booking Jobs</h4>
                {user.bookingJob && user.bookingJob.length > 0 ? (
                  <div className='space-y-1'>
                    {user.bookingJob.slice(0, 2).map((job, index) => (
                      <div key={index} className='p-2 bg-white rounded border text-sm'>
                        {job}
                      </div>
                    ))}
                    {user.bookingJob.length > 2 && (
                      <p className='text-gray-500 text-xs'>+{user.bookingJob.length - 2} more jobs</p>
                    )}
                  </div>
                ) : (
                  <p className='text-gray-500 text-sm'>No booking jobs listed</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className='flex justify-end p-4 border-t border-gray-100'>
          <Button variant='outline' size='sm' onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
