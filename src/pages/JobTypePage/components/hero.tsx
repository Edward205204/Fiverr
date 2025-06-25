import AIArtists from '@/assets/jobtype-page/AI Artists.webp';
import Architecture from '@/assets/jobtype-page/Architecture _ Interior Design.webp';
import poster from '@/assets/jobtype-page/Fiverr.webp';
import Illusatratlon from '@/assets/jobtype-page/Illustration.webp';
import Image from '@/assets/jobtype-page/Image Editing.webp';
import Industrial from '@/assets/jobtype-page/Industrial _ Product Design.webp';
import Minimalist from '@/assets/jobtype-page/Minimalist.webp';
import SocialMedia from '@/assets/jobtype-page/Social Media Design.webp';
import Merchandise from '@/assets/jobtype-page/T-Shirts _ Merchandise.webp';
import Website from '@/assets/jobtype-page/Website Design.webp';
import { useScrollWindow } from '@/hooks/use-scroll-window';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import ServiceItem from '../components/service_item';

const services = [
  {
    title: 'Minimalist Logo Design',
    imageUrl: Minimalist
  },
  {
    title: 'Illusatratlon',
    imageUrl: Illusatratlon
  },
  {
    title: 'Website Design',
    imageUrl: Website
  },
  {
    title: 'Architecture & Interior Design',
    imageUrl: Architecture
  },
  {
    title: 'AI Artists',
    imageUrl: AIArtists
  },
  {
    title: 'Image Editing',
    imageUrl: Image
  },
  {
    title: 'T-Shirt & Merchandise',
    imageUrl: Merchandise
  },
  {
    title: 'Industrial & Product Design',
    imageUrl: Industrial
  },
  {
    title: 'Social Media Design',
    imageUrl: SocialMedia
  }
];

export default function HeroComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const { visibleItems, canScrollLeft, canScrollRight, scrollLeft, scrollRight } = useScrollWindow(services, 4);

  return (
    <>
      <section className='bg-white'>
        <div className='max-w-7xl mx-auto relative mt-3 mb-3'>
          <img src={poster} alt='' className='baner rounded-sm' />
          <div className='absolute text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
            <h2 className='text-[30px] font-bold'>Graphics & Design</h2>
            <p className='text-[20px]'>Designs to make you stand out.</p>
            <div
              onClick={() => setIsOpen(true)}
              className='group flex items-center justify-center mt-4 border border-gray-300 rounded-sm py-2 cursor-pointer hover:bg-gray-100 transition-all duration-200'
            >
              <FontAwesomeIcon icon={faCirclePlay} className='mr-2 text-white group-hover:text-[#013A12]' size='sm' />
              <h4 className='text-[16px] font-medium text-white group-hover:text-[#013A12]'>How Fiverr Works</h4>
            </div>
          </div>
        </div>
        <div className='Scroll'>
          <div className='max-w-7xl mx-auto relative mt-3 mb-3'>
            <div className='flex items-center justify-between mb-4 relative'>
              <h2 className='text-[30px] font-medium'>Most popular in Graphics & Design</h2>
              <div>
                <button
                  onClick={scrollLeft}
                  disabled={!canScrollLeft}
                  className={`absolute right-[40px] top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg transition-opacity ${
                    !canScrollLeft ? 'opacity-30 cursor-not-allowed' : ''
                  }`}
                >
                  <ChevronLeft />
                </button>
                <button
                  onClick={scrollRight}
                  disabled={!canScrollRight}
                  className={`absolute right-[-5px] top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg transition-opacity ${
                    !canScrollRight ? 'opacity-30 cursor-not-allowed' : ''
                  }`}
                >
                  <ChevronRight />
                </button>
              </div>
            </div>
            <div className='flex gap-4 items-center justify-center'>
              <div className='relative flex'>
                <div className='flex gap-4 overflow-hidden mx-auto px-12'>
                  {visibleItems.map((item, index) => (
                    <ServiceItem key={index} {...item} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal hiển thị video */}
      {isOpen && (
        <div
          className='fixed inset-0 flex items-center justify-center bg-[#595959]/70 z-50'
          //   onClick={() => setIsOpen(false)}
        >
          <div className='bg-white/0 p-4 rounded-md relative max-w-3xl w-full' onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsOpen(false)}
              className='absolute cursor-pointer -top-4 right-2 text-white text-3xl'
            >
              ×
            </button>
            <video className='w-full h-auto rounded-md' autoPlay controls preload='metadata' crossOrigin='anonymous'>
              <source
                src='https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/v1/video-attachments/generic_asset/asset/0e7e8378f90eddda63a8953a16bb68fa-1705932024206/How%20Fiverr%20Works%20EN%20Subs%2016x9'
                type='video/mp4'
              />
            </video>
          </div>
        </div>
      )}
    </>
  );
}
