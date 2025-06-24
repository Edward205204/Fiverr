import { JobsAPI } from '@/apis/jobs.api';
import { useQuery } from '@tanstack/react-query';

export default function JobTypeList() {
  const { data } = useQuery({
    queryKey: ['job-types'],
    queryFn: () => JobsAPI.getJobTypes()
  });
  const jobTypeList = data?.data.content;

  if (!jobTypeList) return null;

  return (
    <div>
      <div className='py-2 border-b border-t border-[#e0e0e0]'>
        <div className='container'>
          <div className=' w-full flex items-center gap-4 justify-between'>
            {jobTypeList.map((item) => (
              <div className='text-sm font-medium text-[#7b7b7b] hover:cursor-pointer'>{item.tenLoaiCongViec}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
