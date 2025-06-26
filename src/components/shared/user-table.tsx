import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import managerApi from '@/apis/manager.api';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Eye } from 'lucide-react';
import Pagination from '@/components/ui/pagination';
import { usePagination } from '@/hooks/use-pagination';
import UserDetailModal from '@/components/shared/user-detail-modal';
import { toast } from 'react-toastify';

interface UserTableProps {
  keyword?: string;
  pageIndex: number;
  pageSize: number;
}

export default function UserTable({ keyword, pageIndex, pageSize }: UserTableProps) {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['users', pageIndex, pageSize, keyword],
    queryFn: () => managerApi.getUsers({ pageIndex, pageSize, keyword: keyword })
  });

  const users = data?.data.content.data || [];
  const totalRows = data?.data.content.totalRow || 0;

  const { currentPage, totalPages, handlePageChange, handlePageSizeChange, showingInfo } = usePagination({
    totalRows,
    pageSize,
    pageIndex
  });

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: (userId: number) => managerApi.deleteUser(userId),
    onSuccess: () => {
      toast.success('User deleted successfully!');
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const formatDate = (dateString: string) => {
    if (!dateString || dateString === '0') return 'N/A';
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const formatGender = (gender: boolean) => {
    return gender ? 'Nam' : 'Nữ';
  };

  const formatRole = (role: string) => {
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          role === 'ADMIN' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
        }`}
      >
        {role}
      </span>
    );
  };

  const handleViewUser = (userId: number) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
  };

  const handleDeleteUser = (user: { id: number; name: string; role: string }) => {
    if (user.role === 'ADMIN') {
      toast.error('Cannot delete ADMIN users!');
      return;
    }

    deleteUserMutation.mutate(user.id);
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
        <p className='text-red-500'>Có lỗi xảy ra khi tải dữ liệu</p>
      </div>
    );
  }

  return (
    <>
      <div className='bg-white rounded-lg shadow-md overflow-hidden'>
        {/* Table */}
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50 border-b border-gray-200'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>User</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Contact
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Role</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Skills
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {users.map((user) => (
                <tr key={user.id} className='hover:bg-gray-50'>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='flex items-center'>
                      <div className='flex-shrink-0 h-10 w-10'>
                        {user.avatar ? (
                          <img className='h-10 w-10 rounded-full object-cover' src={user.avatar} alt={user.name} />
                        ) : (
                          <div className='h-10 w-10 rounded-full bg-green-500 flex items-center justify-center'>
                            <span className='text-white font-medium text-sm'>{user.name.charAt(0).toUpperCase()}</span>
                          </div>
                        )}
                      </div>
                      <div className='ml-4'>
                        <div className='text-sm font-medium text-gray-900'>{user.name}</div>
                        <div className='text-sm text-gray-500'>{formatGender(user.gender)}</div>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-900'>{user.email}</div>
                    <div className='text-sm text-gray-500'>{user.phone}</div>
                    <div className='text-sm text-gray-500'>{formatDate(user.birthday)}</div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>{formatRole(user.role)}</td>
                  <td className='px-6 py-4'>
                    <div className='text-sm text-gray-900'>
                      {user.skill.length > 0 ? (
                        <div className='flex flex-wrap gap-1'>
                          {user.skill.slice(0, 2).map((skill, index) => (
                            <span
                              key={index}
                              className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800'
                            >
                              {skill}
                            </span>
                          ))}
                          {user.skill.length > 2 && (
                            <span className='text-gray-500 text-xs'>+{user.skill.length - 2} more</span>
                          )}
                        </div>
                      ) : (
                        <span className='text-gray-400 text-sm'>No skills</span>
                      )}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                    <div className='flex items-center space-x-2'>
                      <Button
                        size='sm'
                        variant='ghost'
                        className='text-blue-600 hover:text-blue-900'
                        onClick={() => handleViewUser(user.id)}
                      >
                        <Eye className='h-4 w-4' />
                      </Button>
                      <Button size='sm' variant='ghost' className='text-green-600 hover:text-green-900'>
                        <Edit className='h-4 w-4' />
                      </Button>
                      <Button
                        size='sm'
                        variant='ghost'
                        className={`${
                          user.role === 'ADMIN' ? 'text-gray-400 cursor-not-allowed' : 'text-red-600 hover:text-red-900'
                        }`}
                        onClick={() => handleDeleteUser(user)}
                        disabled={user.role === 'ADMIN' || deleteUserMutation.isPending}
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

        {/* Pagination */}
        <div className='bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6'>
          <div className='flex-1 flex justify-between sm:hidden'>
            <Button
              variant='outline'
              size='sm'
              disabled={currentPage <= 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </Button>
            <Button
              variant='outline'
              size='sm'
              disabled={currentPage >= totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </Button>
          </div>
          <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
            <div>
              <p className='text-sm text-gray-700'>
                Showing <span className='font-medium'>{showingInfo.start}</span> to{' '}
                <span className='font-medium'>{showingInfo.end}</span> of{' '}
                <span className='font-medium'>{showingInfo.total}</span> results
              </p>
            </div>
            <div>
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          </div>
        </div>

        {/* Page size selector */}
        <div className='bg-white px-4 py-3 border-t border-gray-200'>
          <div className='flex items-center space-x-2'>
            <span className='text-sm text-gray-700'>Show:</span>
            <select
              value={pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              className='border border-gray-300 rounded-md px-3 py-1 text-sm'
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span className='text-sm text-gray-700'>entries</span>
          </div>
        </div>
      </div>

      {/* User Detail Modal */}
      <UserDetailModal userId={selectedUserId} isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}
