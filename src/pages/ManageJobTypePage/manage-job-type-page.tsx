import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { Button } from '@/components/ui/button';
import { Plus, Briefcase, Layers } from 'lucide-react';
import {
  JobTypeTable,
  JobTypeGroupTable,
  JobTypeFormModal,
  JobTypeGroupFormModal
} from '@/pages/ManageJobTypePage/components';

export default function ManageJobTypePage() {
  const [, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'jobTypes' | 'jobTypeDetails'>('jobTypes');
  const [isJobTypeModalOpen, setIsJobTypeModalOpen] = useState(false);
  const [isJobTypeGroupModalOpen, setIsJobTypeGroupModalOpen] = useState(false);

  const handleTabChange = (tab: 'jobTypes' | 'jobTypeDetails') => {
    setActiveTab(tab);
    setSearchParams({});
  };

  const handleOpenJobTypeModal = () => {
    setIsJobTypeModalOpen(true);
  };

  const handleCloseJobTypeModal = () => {
    setIsJobTypeModalOpen(false);
  };

  const handleOpenJobTypeGroupModal = () => {
    setIsJobTypeGroupModalOpen(true);
  };

  const handleCloseJobTypeGroupModal = () => {
    setIsJobTypeGroupModalOpen(false);
  };

  return (
    <>
      <div className='p-6'>
        {/* Header */}
        <div className='mb-6'>
          <h1 className='text-2xl font-bold text-gray-900 mb-2'>Manage Job Types</h1>
          <p className='text-gray-600'>Manage job types and their detailed categories</p>
        </div>

        {/* Tabs */}
        <div className='mb-6'>
          <div className='border-b border-gray-200'>
            <nav className='-mb-px flex space-x-8'>
              <button
                onClick={() => handleTabChange('jobTypes')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'jobTypes'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Briefcase className='inline-block w-4 h-4 mr-2' />
                Job Types
              </button>
              <button
                onClick={() => handleTabChange('jobTypeDetails')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'jobTypeDetails'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Layers className='inline-block w-4 h-4 mr-2' />
                Job Type Details
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
                {activeTab === 'jobTypes' ? 'Job Types' : 'Job Type Details'}
              </h2>
              <p className='text-sm text-gray-500'>
                {activeTab === 'jobTypes' ? 'Manage main job categories' : 'Manage detailed job categories and groups'}
              </p>
            </div>
            <Button
              onClick={activeTab === 'jobTypes' ? handleOpenJobTypeModal : handleOpenJobTypeGroupModal}
              className='bg-green-600 hover:bg-green-700'
            >
              <Plus className='w-4 h-4 mr-2' />
              Add {activeTab === 'jobTypes' ? 'Job Type' : 'Job Type Group'}
            </Button>
          </div>

          {/* Table Content */}
          <div className='p-6'>
            {activeTab === 'jobTypes' ? (
              <JobTypeTable onOpenModal={handleOpenJobTypeModal} />
            ) : (
              <JobTypeGroupTable onOpenModal={handleOpenJobTypeGroupModal} />
            )}
          </div>
        </div>

        {/* Modals */}
        <JobTypeFormModal isOpen={isJobTypeModalOpen} onClose={handleCloseJobTypeModal} />
        <JobTypeGroupFormModal isOpen={isJobTypeGroupModalOpen} onClose={handleCloseJobTypeGroupModal} />
      </div>
    </>
  );
}
