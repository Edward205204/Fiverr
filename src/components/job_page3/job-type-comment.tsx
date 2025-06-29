import jobApi from '@/apis/job.api';
import { useQuery } from '@tanstack/react-query';
import JobTypeToolComment from './job-type-tool-comment';
import useQueryConfig from '@/hooks/use-query-config';

export default function JobTypeCommentPage3() {
  const { maCongViec } = useQueryConfig();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['job-comment', maCongViec],
    queryFn: () => jobApi.getJobComment(Number(maCongViec))
  });

  const jobComment = data?.data.content;

  if (isLoading) return <p>Đang tải...</p>;
  if (isError || !jobComment) return <p>Lỗi hoặc không có dữ liệu.</p>;
  const jobCommentReverse = [...jobComment].reverse();

  return (
    <div className='container'>
      <JobTypeToolComment item={jobCommentReverse} />
    </div>
  );
}
