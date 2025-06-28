const UserProfile = () => {
  return (
    <div className='container py-6 px-4'>
      <div className='flex gap-6 px-8 py-6 w-full'>
        {/* LEFT - User Info */}
        <div className='w-[320px] bg-white rounded-xl shadow p-6 border border-gray-200'>
          <div className='flex flex-col items-center text-center'>
            <div className='relative w-[100px] h-[100px] rounded-full bg-gray-300 flex items-center justify-center text-white text-2xl font-semibold'>
              K
              <span className='absolute -top-1 -right-1 bg-white px-2 py-0.5 text-green-600 text-[10px] font-semibold rounded-full border border-green-500'>
                ONLINE
              </span>
            </div>
            <h2 className='text-sm font-bold mt-2'>khaidu3</h2>
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
              <span className='font-medium text-gray-700'>Description</span>
              <button className='text-blue-600 text-xs'>Edit Description</button>
            </div>

            <div className='flex justify-between items-start'>
              <div>
                <p className='font-medium text-gray-700 mb-1'>Languages</p>
                <p className='text-gray-600'>English - Basic</p>
              </div>
              <button className='text-blue-600 text-xs whitespace-nowrap'>Add New</button>
            </div>

            <div>
              <div className='flex justify-between items-start mb-1'>
                <p className='font-medium text-gray-700'>Linked Accounts</p>
                <button className='text-blue-600 text-xs whitespace-nowrap'>Add New</button>
              </div>
              <ul className='text-gray-600 text-sm list-disc pl-4 space-y-1'>
                <li>Facebook</li>
                <li>Google</li>
                <li>Dribbble</li>
                <li>Stack Overflow</li>
                <li>GitHub</li>
                <li>Vimeo</li>
                <li>Twitter</li>
              </ul>
            </div>

            <div className='flex justify-between items-start'>
              <div>
                <p className='font-medium text-gray-700 mb-1'>Skills</p>
                <p className='text-gray-500 text-xs'>Add your Skills.</p>
              </div>
              <button className='text-blue-600 text-xs whitespace-nowrap'>Add New</button>
            </div>

            <div className='flex justify-between items-start'>
              <div>
                <p className='font-medium text-gray-700 mb-1'>Education</p>
                <p className='text-gray-500 text-xs'>Add your Education.</p>
              </div>
              <button className='text-blue-600 text-xs whitespace-nowrap'>Add New</button>
            </div>

            <div className='flex justify-between items-start'>
              <div>
                <p className='font-medium text-gray-700 mb-1'>Certification</p>
                <p className='text-gray-500 text-xs'>Add your Certification.</p>
              </div>
              <button className='text-blue-600 text-xs whitespace-nowrap'>Add New</button>
            </div>
          </div>
        </div>
        {/* RIGHT - Gigs hired */}
        <div className='flex-1 bg-white rounded-xl shadow p-4'>
          <h2 className='text-lg font-semibold mb-4'>Công việc đã thuê</h2>
          <div className='space-y-4'>
            {[1, 2].map((id) => (
              <div key={id} className='flex border border-gray-200 rounded-lg p-3 gap-4'>
                <div className='w-[130px] h-[85px] bg-gray-100 overflow-hidden rounded'>
                  <img
                    src='/sample-gig.jpg'
                    alt='gig-img'
                    width={130}
                    height={85}
                    className='object-cover w-full h-full'
                  />
                </div>
                <div className='flex flex-col justify-between flex-1'>
                  <div>
                    <h3 className='text-sm font-semibold text-gray-800'>Lập trình front end với react js</h3>
                    <p className='text-xs text-gray-500'>
                      Đây là mô tả ngắn gọn cho dịch vụ. Đây là mô tả ngắn gọn cho dịch vụ.
                    </p>
                  </div>
                  <div className='flex justify-between items-center mt-2'>
                    <button className='text-sm text-blue-600 hover:underline'>View detail</button>
                    <div className='flex items-center text-yellow-500 text-sm gap-1'>★★★★★</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
