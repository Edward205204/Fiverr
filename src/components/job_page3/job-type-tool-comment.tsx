import { useState } from 'react';
import type { JobTypeComment } from '@/@types/jobs';

interface JobTypeTooltipProps {
  item: JobTypeComment[];
}

export default function JobTypeToolComment({ item }: JobTypeTooltipProps) {
  const [showAll, setShowAll] = useState(false);

  const visibleComments = showAll ? item : item.slice(0, 5);

  return (
    <div className='space-y-4 mt-10'>
      {visibleComments.map((comment) => (
        <div key={comment.id} className='bg-white rounded-lg shadow p-4'>
          <div className='flex items-center gap-2 mb-2'>
            <img src={comment.avatar} alt={comment.tenNguoiBinhLuan} className='w-6 h-6 object-cover rounded-full' />
            <p className='font-semibold text-gray-800'>{comment.tenNguoiBinhLuan}</p>
            <span className='flex items-center text-yellow-500 text-sm'>
              <svg className='w-4 h-4 mr-1' fill='currentColor' viewBox='0 0 20 20'>
                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.049 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z' />
              </svg>
              {comment.saoBinhLuan}
            </span>
          </div>
          <div className='pl-8'>
            <p className='text-gray-700'>{comment.noiDung}</p>
            <p className='text-xs text-gray-400 mt-1'>{comment.ngayBinhLuan}</p>
          </div>
        </div>
      ))}

      {item.length > 5 && (
        <div className='text-center mt-4'>
          <button onClick={() => setShowAll((prev) => !prev)} className='text-blue-600 hover:underline font-medium'>
            {showAll ? 'Ẩn bớt' : 'Xem thêm bình luận'}
          </button>
        </div>
      )}
    </div>
  );
}
