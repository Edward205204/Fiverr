import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ServiceItemProps {
  title: string;
  imageUrl: string;
}

export default function ServiceItem({ title, imageUrl }: ServiceItemProps) {
  return (
    <div className='flex items-center justify-between mt-4 mb-4 shadow-sm p-4 rounded-md border-2 border-[#F0ECED] '>
      <img src={imageUrl} alt='Minimalist' className='size-10 mr-2' />
      <p className=' font-medium mr-2'>{title}</p>
      <FontAwesomeIcon icon={faArrowRight} />
    </div>
  );
}
