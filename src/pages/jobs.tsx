import { JobsAPI } from '@/apis/jobs.api';
import JobTypeList from '@/components/shared/job-type-list';
import useQueryConfig from '@/hooks/use-query-config';
import { useQuery } from '@tanstack/react-query';

export default function Jobs() {
  const queryConfig = useQueryConfig();
  const { data } = useQuery({
    queryKey: ['jobs', queryConfig.pageIndex, queryConfig.pageSize, queryConfig.keyword],
    queryFn: () =>
      JobsAPI.getJobs({
        pageIndex: Number(queryConfig.pageIndex),
        pageSize: Number(queryConfig.pageSize),
        keyword: queryConfig.keyword || ''
      })
  });

  console.log(data);
  return (
    <div>
      <JobTypeList />
    </div>
  );
}
