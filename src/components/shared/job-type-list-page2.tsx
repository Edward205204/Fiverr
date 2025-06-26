import { JobsAPI } from '@/apis/jobs.api';
import { useQuery } from '@tanstack/react-query';
import JobTypeToolPage2 from './job-type-tool-page2';

export default function JobTypeListPage2() {
  const { data } = useQuery({
    queryKey: ['job-types'],
    queryFn: () => JobsAPI.getJobTypeDetail()
  });

  const jobTypeList = data?.data.content[0].dsNhomChiTietLoai;
  console.log('jobTypeList', jobTypeList);
  if (!jobTypeList) return null;

  return (
    <div>
      <div className='py-2 border-b border-t border-[#e0e0e0]'>
        <div className='container'>
          <div className='w-full flex items-center gap-4 justify-between'>
            {jobTypeList.map((item) => {
              return (
                <JobTypeToolPage2
                  key={item.id}
                  img={item.hinhAnh}
                  GroundName={item.tenNhom}
                  typeofjob={item.maLoaiCongviec}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
