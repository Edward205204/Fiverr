import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import jobApi from '@/apis/job.api';
import useQueryConfig from '@/hooks/use-query-config';

export default function HorizontalScrollCategories() {
  const { jobTypeId } = useQueryConfig();
  const [searchParams, setSearchParams] = useSearchParams();

  const { data } = useQuery({
    queryKey: ['jobTypes', jobTypeId],
    queryFn: () => jobApi.getJobTypes()
  });

  const jobTypes = data?.data.content;

  useEffect(() => {
    if (jobTypes && jobTypes.length > 0) {
      const currentJobTypeId = Number(jobTypeId);

      if (!jobTypeId || isNaN(currentJobTypeId) || currentJobTypeId < 1) {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('jobTypeId', '1');
        setSearchParams(newSearchParams);
      }
    }
  }, [jobTypes, jobTypeId, searchParams, setSearchParams]);

  const jobType = jobTypes?.find((item) => item.id === Number(jobTypeId));

  return (
    <>
      <div className='max-w-7xl mx-auto mt-3 mb-20'>
        <h2 className='text-[30px] font-medium mt-4 mb-8'>Explore {jobType?.tenLoaiCongViec}</h2>
      </div>
      <div className='container pb-12'>
        <div className='relative w-full flex overflow-x-auto scroll-smooth space-x-6 no-scrollbar px-12 gap-4'>
          {jobType?.dsNhomChiTietLoai &&
            jobType.dsNhomChiTietLoai.map((item) => (
              <div
                key={item.id}
                className='flex-none w-[220px] bg-white rounded-xl  hover:shadow-md transition-all p-4'
              >
                <div className='relative w-full pt-[100%] mb-4 rounded-md overflow-hidden'>
                  <img
                    src={item.hinhAnh}
                    alt={item.tenNhom}
                    className='absolute top-0 left-0 w-full h-full object-cover'
                  />
                </div>

                <h3 className='font-semibold text-base text-gray-800 mb-3'>{item.tenNhom}</h3>

                <ul className='space-y-1 text-sm text-gray-600'>
                  {item.dsChiTietLoai && item.dsChiTietLoai.length > 0 ? (
                    item.dsChiTietLoai.map((chiTiet) => (
                      <li key={chiTiet.id} className='hover:text-black cursor-pointer transition-colors py-2'>
                        {chiTiet.tenChiTiet}
                      </li>
                    ))
                  ) : (
                    <li className='hover:text-black cursor-pointer transition-colors py-2'>
                      <p>No data</p>
                    </li>
                  )}
                </ul>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
