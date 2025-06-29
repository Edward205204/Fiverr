import { useState } from 'react';
import type { JobDetailPage3 } from '@/@types/jobs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClock, faUser } from '@fortawesome/free-solid-svg-icons';

interface JobTypeTooltipProps {
  item: JobDetailPage3[]; // Mảng công việc
}

export default function JobTypePrice({ item }: JobTypeTooltipProps) {
  const [selectedTabs, setSelectedTabs] = useState<Record<number, 'Basic' | 'Standard' | 'Premium'>>(() =>
    Object.fromEntries(item.map((job) => [job.id, 'Standard']))
  );

  const handleSelect = (jobId: number, type: 'Basic' | 'Standard' | 'Premium') => {
    setSelectedTabs((prev) => ({ ...prev, [jobId]: type }));
  };

  return (
    <div className='m-20'>
      {item.map((job) => (
        <div key={job.id} className='mb-6 border-2 border-[#DADEDE] rounded'>
          <div className='grid grid-cols-3 text-center bg-gray-100'>
            {(['Basic', 'Standard', 'Premium'] as const).map((type) => {
              const isSelected = selectedTabs[job.id] === type;
              const borderSide = type === 'Basic' ? 'border-r-2' : type === 'Premium' ? 'border-l-2' : '';

              return (
                <p
                  key={type}
                  className={`p-4 cursor-pointer ${borderSide} border-[#DADEDE] ${
                    isSelected ? 'text-[#1EBF73] border-b-2 border-b-green-500 font-medium bg-white' : 'border-b-2'
                  }`}
                  onClick={() => handleSelect(job.id, type)}
                >
                  {type}
                </p>
              );
            })}
          </div>
          {/* Hiển thị nội dung tương ứng nếu muốn */}
          <div className='p-4 m-2'>
            <div className='flex items-center justify-between gap-2 mb-5'>
              <p>
                <strong>{selectedTabs[job.id]}</strong>
              </p>
              <p>${job.congViec.giaTien}</p>
            </div>
            <p>Create a simple web application for your business</p>
            <p className='mt-2 mb-5'>{job.congViec.moTaNgan}</p>
            <div className='flex items-center justify-between m-4'>
              <div>
                <FontAwesomeIcon icon={faClock} />
                <span className='ml-2'>Delivery in 3 days</span>
              </div>
              <div>
                <FontAwesomeIcon icon={faUser} />
                <span className='ml-2'>5 Revision</span>
              </div>
            </div>
            <div className='flex items-center ml-4'>
              <FontAwesomeIcon icon={faCheck} style={{ color: '#13c97a' }} />
              <span className='ml-2 text-gray-500'>Design Customization</span>
            </div>
            <div className='flex items-center ml-4'>
              <FontAwesomeIcon icon={faCheck} />
              <span className='ml-2 text-gray-500'>Content Upload</span>
            </div>
            <div className='flex items-center ml-4'>
              <FontAwesomeIcon icon={faCheck} style={{ color: '#13c97a' }} />
              <span className='ml-2 text-gray-500'>Responsive Design</span>
            </div>
            <div className='flex items-center ml-4'>
              <FontAwesomeIcon icon={faCheck} style={{ color: '#13c97a' }} />
              <span className='ml-2 text-gray-500'>Include Source Code</span>
            </div>
            <div className='flex items-center ml-4'>
              <FontAwesomeIcon icon={faCheck} />
              <span className='ml-2 text-gray-500'>1 Page</span>
            </div>
          </div>
          <div className='w-[80%] items-center mx-auto mb-5'>
            <button className='w-full bg-[#1EBF73] text-white py-2 rounded-b border-t-2 border-[#DADEDE] hover:bg-green-600 transition-colors duration-200 cursor-pointer'>
              Continue <span>${job.congViec.giaTien}</span>
            </button>
            <button className='w-full py-2 cursor-pointer'>
              <span className='text-[#1EBF73] text-sm'>Compare Packages</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
