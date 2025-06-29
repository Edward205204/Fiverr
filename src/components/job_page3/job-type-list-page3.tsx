import jobApi from '@/apis/job.api';
import { useQuery } from '@tanstack/react-query';
import JobTypeToolPage3 from './job-type-tool-page3';

export default function JobTypeListPage3() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['job-detail', 1],
    queryFn: () => jobApi.getJobDetail(1)
  });

  const jobDetail = data?.data.content;

  if (isLoading) return <p>Đang tải...</p>;
  if (isError || !jobDetail) return <p>Lỗi hoặc không có dữ liệu.</p>;

  return (
    <div>
      <JobTypeToolPage3 item={jobDetail} />
    </div>
  );
}
