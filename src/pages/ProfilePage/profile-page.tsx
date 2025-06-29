import { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import userApi from '@/apis/user.api';
import UserEditModal from '@/components/shared/user-edit-modal';
import AvatarUpload from '@/components/shared/avatar-upload';
import HiredJobDetailModal from '@/components/shared/hired-job-detail-modal';
import { Button } from '@/components/ui/button';
import { HiredJob, User } from '@/@types/user';
import { AppContext } from '@/contexts/app.context';

const UserProfile = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedHiredJob, setSelectedHiredJob] = useState<HiredJob | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const { profile } = useContext(AppContext);
  const userId = (profile as User).id;

  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => userApi.getUser(userId)
  });

  const { data: hiredJobsData, isLoading: hiredJobsLoading } = useQuery({
    queryKey: ['hiredJobs'],
    queryFn: () => userApi.getHiredJobs()
  });

  const user = userData?.data.content;
  const hiredJobs = hiredJobsData?.data.content || [];

  const formatDate = (dateString: string) => {
    if (!dateString || dateString === '0') return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
  };

  const formatBirthday = (birthday: string) => {
    if (!birthday || birthday === '0') return 'N/A';
    const date = new Date(birthday);
    return date.toLocaleDateString('en-US');
  };

  const handleViewDetail = (hiredJob: HiredJob) => {
    setSelectedHiredJob(hiredJob);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedHiredJob(null);
  };

  if (userLoading) {
    return (
      <div className='container py-6 px-4'>
        <div className='flex gap-6 px-8 py-6 w-full'>
          <div className='w-[320px] bg-white rounded-xl shadow p-6 border border-gray-200 animate-pulse'>
            <div className='w-[100px] h-[100px] rounded-full bg-gray-300 mx-auto'></div>
            <div className='h-4 bg-gray-300 rounded mt-4'></div>
          </div>
          <div className='flex-1 bg-white rounded-xl shadow p-4 animate-pulse'>
            <div className='h-6 bg-gray-300 rounded mb-4'></div>
            <div className='space-y-4'>
              {[1, 2].map((i) => (
                <div key={i} className='h-20 bg-gray-300 rounded'></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='container py-6 px-4'>
      <div className='flex gap-6 px-8 py-6 w-full'>
        <div className='w-[320px] bg-white rounded-xl shadow p-6 border border-gray-200'>
          <div className='flex flex-col items-center text-center'>
            <AvatarUpload currentAvatar={user?.avatar || ''} userId={userId} onAvatarChange={() => {}} />
            <h2 className='text-sm font-bold mt-2'>{user?.name || 'User'}</h2>
            <p className='text-xs text-gray-500 mt-1'>{user?.email}</p>
            <div className='flex justify-between w-full mt-4 text-xs text-gray-600'>
              <div className='flex flex-col items-start'>
                <p className='mb-1'>From</p>
                <p className='font-medium'>Vietnam</p>
              </div>
              <div className='flex flex-col items-end'>
                <p className='mb-1'>Member since</p>
                <p className='font-medium'>May 2021</p>
              </div>
            </div>
          </div>

          <div className='mt-6 border-t border-gray-200 pt-4 text-sm space-y-6'>
            <div className='flex justify-between items-start'>
              <span className='font-medium text-gray-700'>Personal Information</span>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setIsEditModalOpen(true)}
                className='text-blue-600 text-xs'
              >
                Edit
              </Button>
            </div>

            <div className='space-y-2'>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Phone:</span>
                <span className='font-medium'>{user?.phone || 'N/A'}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Birthday:</span>
                <span className='font-medium'>{formatBirthday(user?.birthday || '')}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Gender:</span>
                <span className='font-medium'>{user?.gender ? 'Male' : 'Female'}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Role:</span>
                <span className='font-medium'>{user?.role || 'USER'}</span>
              </div>
            </div>

            <div className='flex justify-between items-start'>
              <div>
                <p className='font-medium text-gray-700 mb-1'>Skills</p>
                {user?.skill && user.skill.length > 0 ? (
                  <div className='flex flex-wrap gap-1'>
                    {user.skill.map((skill, index) => (
                      <span key={index} className='bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs'>
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className='text-gray-500 text-xs'>No skills added yet.</p>
                )}
              </div>
            </div>

            <div className='flex justify-between items-start'>
              <div>
                <p className='font-medium text-gray-700 mb-1'>Certifications</p>
                {user?.certification && user.certification.length > 0 ? (
                  <div className='flex flex-wrap gap-1'>
                    {user.certification.map((cert, index) => (
                      <span key={index} className='bg-green-100 text-green-800 px-2 py-1 rounded text-xs'>
                        {cert}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className='text-gray-500 text-xs'>No certifications added yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className='flex-1 bg-white rounded-xl shadow p-4'>
          <h2 className='text-lg font-semibold mb-4'>Hired Jobs</h2>
          {hiredJobsLoading ? (
            <div className='space-y-4'>
              {[1, 2].map((i) => (
                <div key={i} className='flex border border-gray-200 rounded-lg p-3 gap-4 animate-pulse'>
                  <div className='w-[130px] h-[85px] bg-gray-300 rounded'></div>
                  <div className='flex-1 space-y-2'>
                    <div className='h-4 bg-gray-300 rounded'></div>
                    <div className='h-3 bg-gray-300 rounded w-3/4'></div>
                  </div>
                </div>
              ))}
            </div>
          ) : hiredJobs.length > 0 ? (
            <div className='space-y-4'>
              {hiredJobs.map((hiredJob) => (
                <div key={hiredJob.id} className='flex border border-gray-200 rounded-lg p-3 gap-4'>
                  <div className='w-[130px] h-[85px] bg-gray-100 overflow-hidden rounded'>
                    <img
                      src={hiredJob.congViec.hinhAnh}
                      alt={hiredJob.congViec.tenCongViec}
                      width={130}
                      height={85}
                      className='object-cover w-full h-full'
                    />
                  </div>
                  <div className='flex flex-col justify-between flex-1'>
                    <div>
                      <h3 className='text-sm font-semibold text-gray-800'>{hiredJob.congViec.tenCongViec}</h3>
                      <p className='text-xs text-gray-500 mt-1'>{hiredJob.congViec.moTaNgan}</p>
                      <p className='text-xs text-gray-400 mt-1'>Hired date: {formatDate(hiredJob.ngayThue)}</p>
                    </div>
                    <div className='flex justify-between items-center mt-2'>
                      <button
                        className='text-sm text-blue-600 hover:underline'
                        onClick={() => handleViewDetail(hiredJob)}
                      >
                        View details
                      </button>
                      <div className='flex items-center gap-2'>
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            hiredJob.hoanThanh ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {hiredJob.hoanThanh ? 'Completed' : 'In Progress'}
                        </span>
                        <div className='flex items-center text-yellow-500 text-sm gap-1'>
                          {'★'.repeat(hiredJob.congViec.saoCongViec)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='text-center py-8 text-gray-500'>
              <p>You haven't hired any jobs yet.</p>
            </div>
          )}
        </div>
      </div>

      {user && <UserEditModal user={user} isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />}

      <HiredJobDetailModal hiredJob={selectedHiredJob} isOpen={isDetailModalOpen} onClose={handleCloseDetailModal} />
    </div>
  );
};

export default UserProfile;
