import { useQuery } from '@tanstack/react-query';
import JobTypeTooltip from './job-type-tooltip';
import jobApi from '@/apis/job.api';

export default function JobTypeList() {
  const { data } = useQuery({
    queryKey: ['job-types'],
    queryFn: () => jobApi.getJobTypes()
  });

  const jobTypeList = data?.data.content;
  console.log(jobTypeList);
  if (!jobTypeList) return null;

  return (
    <div>
      <div className='py-2 border-b border-t border-[#e0e0e0]'>
        <div className='container'>
          <div className='w-full flex items-center gap-4 justify-between'>
            {jobTypeList.map((item) => (
              <JobTypeTooltip key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
