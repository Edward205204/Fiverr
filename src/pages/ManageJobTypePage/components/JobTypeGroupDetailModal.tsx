import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { X, Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import jobsTypeApi from '@/apis/jobs-type.api';
import { JobTypeDetail, JobTypeDetailItem } from '@/@types/jobs-type';
import { toast } from 'react-toastify';

interface JobTypeGroupDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  group: JobTypeDetail | null;
}

export default function JobTypeGroupDetailModal({ isOpen, onClose, group }: JobTypeGroupDetailModalProps) {
  const [newDetailItem, setNewDetailItem] = useState('');
  const [editingItem, setEditingItem] = useState<{ id: number; name: string } | null>(null);
  const [editValue, setEditValue] = useState('');
  const queryClient = useQueryClient();

  const addDetailItemMutation = useMutation({
    mutationFn: (data: { id: number; tenChiTiet: string }) => jobsTypeApi.createJobTypeDetail(data),
    onSuccess: () => {
      toast.success('Detail item added successfully!');
      queryClient.invalidateQueries({ queryKey: ['jobTypeDetails'] });
      setNewDetailItem('');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to add detail item');
    }
  });

  const updateDetailItemMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: { id: number; tenChiTiet: string } }) =>
      jobsTypeApi.updateJobTypeDetail(id, data),
    onSuccess: () => {
      toast.success('Detail item updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['jobTypeDetails'] });
      setEditingItem(null);
      setEditValue('');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update detail item');
    }
  });

  const deleteDetailItemMutation = useMutation({
    mutationFn: (id: number) => jobsTypeApi.deleteJobTypeDetail(id),
    onSuccess: () => {
      toast.success('Detail item deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['jobTypeDetails'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete detail item');
    }
  });

  const handleAddDetailItem = () => {
    if (!newDetailItem.trim() || !group) return;

    if (group.dsChiTietLoai.some((item) => item.tenChiTiet.toLowerCase() === newDetailItem.trim().toLowerCase())) {
      toast.error('This detail item already exists');
      return;
    }

    addDetailItemMutation.mutate({
      id: 0,
      tenChiTiet: newDetailItem.trim()
    });
  };

  const handleStartEdit = (item: JobTypeDetailItem) => {
    setEditingItem({ id: item.id, name: item.tenChiTiet });
    setEditValue(item.tenChiTiet);
  };

  const handleSaveEdit = () => {
    if (!editingItem || !editValue.trim()) return;

    updateDetailItemMutation.mutate({
      id: editingItem.id,
      data: { id: editingItem.id, tenChiTiet: editValue.trim() }
    });
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setEditValue('');
  };

  const handleDeleteDetailItem = (item: JobTypeDetailItem) => {
    if (window.confirm(`Are you sure you want to delete "${item.tenChiTiet}"?`)) {
      deleteDetailItemMutation.mutate(item.id);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (editingItem) {
        handleSaveEdit();
      } else {
        handleAddDetailItem();
      }
    } else if (e.key === 'Escape') {
      if (editingItem) {
        handleCancelEdit();
      }
    }
  };

  if (!isOpen || !group) return null;

  const isSubmitting =
    addDetailItemMutation.isPending || updateDetailItemMutation.isPending || deleteDetailItemMutation.isPending;

  return (
    <div className='fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden'>
        <div className='flex items-center justify-between p-6 border-b border-gray-200'>
          <div>
            <h2 className='text-lg font-semibold text-gray-900'>Job Type Group Details</h2>
            <p className='text-sm text-gray-500'>
              #{group.id} - {group.tenNhom}
            </p>
          </div>
          <Button variant='ghost' size='sm' onClick={onClose} className='text-gray-400 hover:text-gray-600'>
            <X className='h-5 w-5' />
          </Button>
        </div>

        <div className='p-6 overflow-y-auto max-h-[calc(90vh-120px)]'>
          <div className='mb-6'>
            <h3 className='text-lg font-medium text-gray-900 mb-4'>Group Information</h3>
            <div className='bg-gray-50 rounded-lg p-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>ID</label>
                  <p className='text-sm text-gray-900'>#{group.id}</p>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>Name</label>
                  <p className='text-sm text-gray-900'>{group.tenNhom}</p>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>Job Type ID</label>
                  <p className='text-sm text-gray-900'>#{group.maLoaiCongviec}</p>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>Detail Items</label>
                  <p className='text-sm text-gray-900'>{group.dsChiTietLoai.length} items</p>
                </div>
              </div>
            </div>
          </div>

          {group.hinhAnh && (
            <div className='mb-6'>
              <h3 className='text-lg font-medium text-gray-900 mb-4'>Group Image</h3>
              <img
                src={group.hinhAnh}
                alt={group.tenNhom}
                className='w-full max-w-md h-48 object-cover rounded-lg'
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          )}

          <div>
            <h3 className='text-lg font-medium text-gray-900 mb-4'>Detail Items</h3>

            <div className='flex gap-2 mb-4'>
              <Input
                type='text'
                value={newDetailItem}
                onChange={(e) => setNewDetailItem(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder='Enter detail item name...'
                disabled={isSubmitting}
              />
              <Button
                onClick={handleAddDetailItem}
                disabled={!newDetailItem.trim() || isSubmitting}
                className='bg-green-600 hover:bg-green-700'
              >
                <Plus className='w-4 h-4' />
              </Button>
            </div>

            {group.dsChiTietLoai.length > 0 ? (
              <div className='space-y-2'>
                {group.dsChiTietLoai.map((item) => (
                  <div key={item.id} className='flex items-center justify-between bg-gray-50 rounded px-3 py-2'>
                    {editingItem?.id === item.id ? (
                      <div className='flex items-center gap-2 flex-1'>
                        <Input
                          type='text'
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyPress={handleKeyPress}
                          className='flex-1'
                          disabled={isSubmitting}
                        />
                        <Button
                          size='sm'
                          onClick={handleSaveEdit}
                          disabled={!editValue.trim() || isSubmitting}
                          className='bg-green-600 hover:bg-green-700'
                        >
                          Save
                        </Button>
                        <Button size='sm' variant='outline' onClick={handleCancelEdit} disabled={isSubmitting}>
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <>
                        <span className='text-sm text-gray-700 flex-1'>{item.tenChiTiet}</span>
                        <div className='flex items-center space-x-1'>
                          <Button
                            size='sm'
                            variant='ghost'
                            onClick={() => handleStartEdit(item)}
                            disabled={isSubmitting}
                            className='text-blue-600 hover:text-blue-900'
                          >
                            <Edit className='w-4 h-4' />
                          </Button>
                          <Button
                            size='sm'
                            variant='ghost'
                            onClick={() => handleDeleteDetailItem(item)}
                            disabled={isSubmitting}
                            className='text-red-600 hover:text-red-900'
                          >
                            <Trash2 className='w-4 h-4' />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className='text-center py-8'>
                <p className='text-gray-500'>No detail items yet. Add some to get started.</p>
              </div>
            )}
          </div>
        </div>

        <div className='flex items-center justify-end p-6 border-t border-gray-200'>
          <Button variant='outline' onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
