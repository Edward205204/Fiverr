import jobApi from '@/apis/job.api';
import { useQuery } from '@tanstack/react-query';

interface SearchParams {
  keyword: string;
  pageIndex?: number;
  pageSize?: number;
}

export function useSearchJobs({ keyword, pageIndex = 1, pageSize = 10 }: SearchParams) {
  return useQuery({
    queryKey: ['search-jobs', keyword, pageIndex, pageSize],
    queryFn: () => jobApi.getJobsManager({ keyword, pageIndex, pageSize }),
    staleTime: 1000 * 60 * 5
  });
}
