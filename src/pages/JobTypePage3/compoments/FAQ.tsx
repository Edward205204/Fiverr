import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

type FAQItem = {
  question: string;
  answer: string;
};

const data: FAQItem[] = [
  {
    question: 'What is the purpose of this page?',
    answer: 'This page provides answers to common questions about our services.'
  },
  {
    question: 'How can I contact support?',
    answer: 'You can contact support via email or through our contact form.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept various payment methods including credit cards and PayPal.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number): void => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className='container mt-3 mb-20'>
      <h2 className='text-[30px] font-medium mt-4 mb-8'>FAQ</h2>
      {data.map((item, index) => (
        <div key={index} className='flex flex-col mb-4 border-b pb-4 relative'>
          <div className='flex justify-between items-start cursor-pointer' onClick={() => toggleAnswer(index)}>
            <h3 className='text-[20px] font-semibold'>{item.question}</h3>
            <FontAwesomeIcon icon={openIndex === index ? faAngleUp : faAngleDown} className='text-gray-500 mt-1' />
          </div>
          {openIndex === index && <p className='mt-2'>{item.answer}</p>}
        </div>
      ))}
    </div>
  );
}
