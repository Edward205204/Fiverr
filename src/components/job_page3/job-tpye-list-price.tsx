import jobApi from '@/apis/job.api';
import { useQuery } from '@tanstack/react-query';
import JobTypePrice from './job-type-price';

export default function JobTypeListPrice() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['job-detail', 1],
    queryFn: () => jobApi.getJobDetail(1)
  });

  const jobDetail = data?.data.content;

  if (isLoading) return <p>Đang tải...</p>;
  if (isError || !jobDetail) return <p>Lỗi hoặc không có dữ liệu.</p>;

  return (
    <div>
      <JobTypePrice item={jobDetail} />
    </div>
  );
}
