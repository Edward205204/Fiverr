import jobApi from '@/apis/job.api';
import { useQuery } from '@tanstack/react-query';
import JobTypeToolPage2 from './job-type-tool-page2';

export default function JobTypeListPage2() {
  const { data } = useQuery({
    queryKey: ['job-types'],
    queryFn: () => jobApi.getJobTypes()
  });

  const jobTypeList = data?.data.content;
  console.log('jobTypeList', jobTypeList);
  if (!jobTypeList) return null;

  return (
    <div>
      <>
        <div className='container'>
          {jobTypeList.map((item) => (
            <JobTypeToolPage2 key={item.id} item={item} />
          ))}
        </div>
      </>
    </div>
  );
}
