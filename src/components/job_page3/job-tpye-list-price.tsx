import jobApi from '@/apis/job.api';
import { useQuery } from '@tanstack/react-query';
import JobTypePrice from './job-type-price';
import useQueryConfig from '@/hooks/use-query-config';

export default function JobTypeListPrice() {
  const { maCongViec } = useQueryConfig();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['job-detail', maCongViec],
    queryFn: () => jobApi.getJobDetail(Number(maCongViec))
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
