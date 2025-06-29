import type { JobDetailPage3 } from '@/@types/jobs';

interface JobTypeTooltipProps {
  job?: JobDetailPage3 | JobDetailPage3[];
}

export default function JobTypeToolPage2({ job }: JobTypeTooltipProps) {
  const jobData = Array.isArray(job) ? job[0] : job;

  return (
    <div>
      {jobData && jobData.congViec && (
        <div key={jobData.id} className='mb-3'>
          <p className='text-blue-600 text-lg mb-2'>
            <span>
              {jobData.tenLoaiCongViec} &gt; {jobData.tenNhomChiTietLoai} &gt; {jobData.tenChiTietLoai}
            </span>
          </p>
          <h3 className='text-2xl font-medium mt-10'>{jobData.congViec.tenCongViec}</h3>
          <div className='h-[15px] flex items-center gap-2 mb-2 mt-2'>
            <img
              src={jobData.avatar}
              className='w-[15px] h-[15px] mb-2 object-cover rounded-sm transition-transform duration-200'
            />
            <p className='font-medium'>{jobData.tenNguoiTao}</p>
            <p>{'⭐'.repeat(jobData.congViec.saoCongViec)}</p>
            <p>
              (<span>{jobData.congViec.danhGia}</span>)
            </p>
          </div>
          <img
            src={jobData.congViec.hinhAnh}
            alt={jobData.congViec.tenCongViec}
            className='w-full h-full mb-2 object-cover rounded-sm transition-transform duration-200'
          />
          <div className='ml-8 mb-4'>
            <h2 className='text-2xl font-medium mt-10'>About this gig</h2>
            <p>{jobData.congViec.moTa}</p>
          </div>

          <div className='ml-8 mb-8'>
            <h2 className='text-2xl font-medium mt-10'>About The Seller</h2>
            <div className='flex items-center gap-2 mb-2 mt-2'>
              <div>
                <img
                  src={jobData.avatar}
                  className='w-[100px] h-[100px] rounded-full mb-2 object-cover transition-transform duration-200'
                />
              </div>
              <div className='mb-2'>
                <p className='font-medium'>{jobData.tenNguoiTao}</p>
                <div className='flex items-center gap-2 mb-2 mt-2'>
                  <p>{'⭐'.repeat(jobData.congViec.saoCongViec)}</p>
                  <p>
                    (<span>{jobData.congViec.danhGia}</span>)
                  </p>
                </div>
                <button className='border-black border-2 p-2 cursor-pointer'>Contact Me</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
