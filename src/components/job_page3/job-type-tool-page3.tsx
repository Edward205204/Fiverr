import type { JobDetailPage3 } from '@/@types/jobs';

interface JobTypeTooltipProps {
  item: JobDetailPage3[]; // 👈 giờ nhận MẢNG thay vì 1 object
}

export default function JobTypeToolPage2({ item }: JobTypeTooltipProps) {
  return (
    <div>
      {item.map((job) => (
        <div key={job.id} className='mb-3'>
          <p className='text-blue-600 text-lg mb-2'>
            <span>
              {job.tenLoaiCongViec} &gt; {job.tenNhomChiTietLoai} &gt; {job.tenChiTietLoai}
            </span>
          </p>
          <h3 className='text-2xl font-medium mt-10'>{job.congViec.tenCongViec}</h3>
          <div className='h-[15px] flex items-center gap-2 mb-2 mt-2'>
            <img
              src={job.avatar}
              className='w-[15px] h-[15px] mb-2 object-cover rounded-sm transition-transform duration-200'
            />
            <p className='font-medium'>{job.tenNguoiTao}</p>
            <p>{'⭐'.repeat(job.congViec.saoCongViec)}</p>
            <p>
              (<span>{job.congViec.danhGia}</span>)
            </p>
          </div>
          <img
            src={job.congViec.hinhAnh}
            alt={job.congViec.tenCongViec}
            className='w-full h-full mb-2 object-cover rounded-sm transition-transform duration-200'
          />
          <div className='ml-8 mb-4'>
            <h2 className='text-2xl font-medium mt-10'>About this gig</h2>
            <p>{job.congViec.moTa}</p>
          </div>

          <div className='ml-8 mb-8'>
            <h2 className='text-2xl font-medium mt-10'>About The Seller</h2>
            <div className='flex items-center gap-2 mb-2 mt-2'>
              <div>
                <img
                  src={job.avatar}
                  className='w-[100px] h-[100px] rounded-full mb-2 object-cover transition-transform duration-200'
                />
              </div>
              <div className='mb-2'>
                <p className='font-medium'>{job.tenNguoiTao}</p>
                <div className='flex items-center gap-2 mb-2 mt-2'>
                  <p>{'⭐'.repeat(job.congViec.saoCongViec)}</p>
                  <p>
                    (<span>{job.congViec.danhGia}</span>)
                  </p>
                </div>
                <button className='border-black border-2 p-2 cursor-pointer'>Contact Me</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
