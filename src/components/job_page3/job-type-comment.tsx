import jobApi from '@/apis/job.api';
import { useQuery } from '@tanstack/react-query';
import JobTypeToolComment from './job-type-tool-comment';

export default function JobTypeCommentPage3() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['job-commet', 1],
    queryFn: () => jobApi.getJobComment(1)
  });

  const jobComment = data?.data.content;

  if (isLoading) return <p>Đang tải...</p>;
  if (isError || !jobComment) return <p>Lỗi hoặc không có dữ liệu.</p>;
  console.log('jobComment', jobComment);

  return (
    <div className='container'>
      <JobTypeToolComment item={jobComment} />
    </div>
  );
}
