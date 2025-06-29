import jobApi from '@/apis/job.api';
import { useQuery } from '@tanstack/react-query';
import JobTypeToolPage3 from './job-type-tool-page3';
import useQueryConfig from '@/hooks/use-query-config';

export default function JobTypeListPage3() {
  const { maCongViec } = useQueryConfig();
  const { data } = useQuery({
    queryKey: ['job-detail', maCongViec],
    queryFn: () => jobApi.getJobDetail(Number(maCongViec))
  });

  const jobDetail = data?.data.content;

  return <div>{<JobTypeToolPage3 job={jobDetail} />}</div>;
}
