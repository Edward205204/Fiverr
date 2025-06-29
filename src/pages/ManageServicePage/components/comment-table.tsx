import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Edit, Trash2, Eye, MessageSquare, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import servicesApi from '@/apis/services.api';
import { BinhLuan } from '@/@types/services';
import CommentFormModal from './comment-form-modal';
import CommentDetailModal from './comment-detail-modal';
import { toast } from 'react-toastify';

interface CommentTableProps {
  onOpenModal: () => void;
}

export default function CommentTable({ onOpenModal }: CommentTableProps) {
  const [selectedComment, setSelectedComment] = useState<BinhLuan | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingComment, setEditingComment] = useState<BinhLuan | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['binhLuan'],
    queryFn: () => servicesApi.getBinhLuanList()
  });

  const comments = data?.data.content || [];

  const deleteCommentMutation = useMutation({
    mutationFn: (id: number) => servicesApi.deleteBinhLuan(id),
    onSuccess: () => {
      toast.success('Comment deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['binhLuan'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete comment');
    }
  });

  const handleViewComment = (comment: BinhLuan) => {
    setSelectedComment(comment);
    setIsDetailModalOpen(true);
  };

  const handleEditComment = (comment: BinhLuan) => {
    setEditingComment(comment);
    setIsEditModalOpen(true);
  };

  const handleDeleteComment = (comment: BinhLuan) => {
    if (window.confirm(`Are you sure you want to delete comment ID: ${comment.id}?`)) {
      deleteCommentMutation.mutate(comment.id);
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingComment(null);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedComment(null);
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-64'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-green-500'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-center py-8'>
        <p className='text-red-500'>Error loading comments</p>
      </div>
    );
  }

  return (
    <>
      <div className='bg-white rounded-lg shadow overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50 border-b border-gray-200'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>ID</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Job ID
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Commenter ID
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Content
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Rating
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Date</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {comments.map((comment) => (
                <tr key={comment.id} className='hover:bg-gray-50'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>#{comment.id}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{comment.maCongViec}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{comment.maNguoiBinhLuan}</td>
                  <td className='px-6 py-4'>
                    <div className='text-sm text-gray-900 max-w-xs truncate' title={comment.noiDung}>
                      {comment.noiDung}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span className='text-yellow-600 font-bold'>{comment.saoBinhLuan}★</span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{comment.ngayBinhLuan}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                    <div className='flex items-center space-x-2'>
                      <Button
                        size='sm'
                        variant='ghost'
                        className='text-blue-600 hover:text-blue-900'
                        onClick={() => handleViewComment(comment)}
                      >
                        <Eye className='h-4 w-4' />
                      </Button>
                      <Button
                        size='sm'
                        variant='ghost'
                        className='text-green-600 hover:text-green-900'
                        onClick={() => handleEditComment(comment)}
                      >
                        <Edit className='h-4 w-4' />
                      </Button>
                      <Button
                        size='sm'
                        variant='ghost'
                        className='text-red-600 hover:text-red-900'
                        onClick={() => handleDeleteComment(comment)}
                        disabled={deleteCommentMutation.isPending}
                      >
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {comments.length === 0 && (
          <div className='text-center py-12'>
            <div className='text-gray-400 mb-4'>
              <MessageSquare className='mx-auto h-12 w-12' />
            </div>
            <h3 className='text-lg font-medium text-gray-900 mb-2'>No comments found</h3>
            <p className='text-gray-500 mb-4'>Get started by creating a new comment.</p>
            <Button onClick={onOpenModal} className='bg-green-600 hover:bg-green-700'>
              <Plus className='w-4 h-4 mr-2' />
              Add Comment
            </Button>
          </div>
        )}
      </div>

      <CommentDetailModal isOpen={isDetailModalOpen} onClose={handleCloseDetailModal} comment={selectedComment} />
      <CommentFormModal isOpen={isEditModalOpen} onClose={handleCloseEditModal} editingComment={editingComment} />
    </>
  );
}
