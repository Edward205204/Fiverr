import { useMutation, useQueryClient } from '@tanstack/react-query';
import userApi from '@/apis/user.api';
import { BinhLuan } from '@/@types/services';
import { useContext, useState } from 'react';
import useQueryConfig from '@/hooks/use-query-config';
import { AppContext } from '@/contexts/app.context';
import { User } from '@/@types/user';
import { toast } from 'react-toastify';

export default function AddComment() {
  const [comment, setComment] = useState('');
  const { maCongViec } = useQueryConfig();
  const { profile } = useContext(AppContext);
  const queryClient = useQueryClient();
  const useCreateComment = useMutation({
    mutationFn: (body: BinhLuan) => userApi.createComment(body),
    onSuccess: () => {
      toast.success('Đã đăng bình luận thành công');
      setComment('');
      queryClient.invalidateQueries({ queryKey: ['job-comment', maCongViec] });
    }
  });
  return (
    <div className='container'>
      <div className='flex flex-col gap-4 p-4 bg-white rounded shadow-md mx-auto'>
        <textarea
          className='border border-gray-300 rounded p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400'
          rows={4}
          placeholder='Add your comment...'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          type='submit'
          onClick={() => {
            useCreateComment.mutate({
              id: 0,
              maCongViec: Number(maCongViec),
              maNguoiBinhLuan: Number((profile as User).id),
              ngayBinhLuan: new Date().toISOString(),
              noiDung: comment,
              saoBinhLuan: 5
            });
          }}
          className='self-end bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition'
        >
          Add Comment
        </button>
      </div>
    </div>
  );
}
