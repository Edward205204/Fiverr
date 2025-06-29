import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { Button } from '@/components/ui/button';
import { Plus, Briefcase, MessageSquare } from 'lucide-react';
import { HireWorkTable, CommentTable, HireWorkFormModal, CommentFormModal } from '@/pages/ManageServicePage/components';

export default function ManageServicePage() {
  const [, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'hireWorks' | 'comments'>('hireWorks');
  const [isHireWorkModalOpen, setIsHireWorkModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  const handleTabChange = (tab: 'hireWorks' | 'comments') => {
    setActiveTab(tab);
    setSearchParams({});
  };

  const handleOpenHireWorkModal = () => {
    setIsHireWorkModalOpen(true);
  };

  const handleCloseHireWorkModal = () => {
    setIsHireWorkModalOpen(false);
  };

  const handleOpenCommentModal = () => {
    setIsCommentModalOpen(true);
  };

  const handleCloseCommentModal = () => {
    setIsCommentModalOpen(false);
  };

  return (
    <>
      <div className='p-6'>
        {/* Header */}
        <div className='mb-6'>
          <h1 className='text-2xl font-bold text-gray-900 mb-2'>Manage Services</h1>
          <p className='text-gray-600'>Manage hire works and comments</p>
        </div>

        {/* Tabs */}
        <div className='mb-6'>
          <div className='border-b border-gray-200'>
            <nav className='-mb-px flex space-x-8'>
              <button
                onClick={() => handleTabChange('hireWorks')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'hireWorks'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Briefcase className='inline-block w-4 h-4 mr-2' />
                Hire Works
              </button>
              <button
                onClick={() => handleTabChange('comments')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'comments'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <MessageSquare className='inline-block w-4 h-4 mr-2' />
                Comments
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className='bg-white rounded-lg shadow'>
          {/* Action Bar */}
          <div className='px-6 py-4 border-b border-gray-200 flex justify-between items-center'>
            <div>
              <h2 className='text-lg font-semibold text-gray-900'>
                {activeTab === 'hireWorks' ? 'Hire Works' : 'Comments'}
              </h2>
              <p className='text-sm text-gray-500'>
                {activeTab === 'hireWorks' ? 'Manage job hire transactions' : 'Manage user comments and ratings'}
              </p>
            </div>
            <Button
              onClick={activeTab === 'hireWorks' ? handleOpenHireWorkModal : handleOpenCommentModal}
              className='bg-green-600 hover:bg-green-700'
            >
              <Plus className='w-4 h-4 mr-2' />
              Add {activeTab === 'hireWorks' ? 'Hire Work' : 'Comment'}
            </Button>
          </div>

          {/* Table Content */}
          <div className='p-6'>
            {activeTab === 'hireWorks' ? (
              <HireWorkTable onOpenModal={handleOpenHireWorkModal} />
            ) : (
              <CommentTable onOpenModal={handleOpenCommentModal} />
            )}
          </div>
        </div>

        <HireWorkFormModal isOpen={isHireWorkModalOpen} onClose={handleCloseHireWorkModal} />
        <CommentFormModal isOpen={isCommentModalOpen} onClose={handleCloseCommentModal} />
      </div>
    </>
  );
}
