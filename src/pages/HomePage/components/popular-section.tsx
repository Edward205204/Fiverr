import ServiceItem from '@/components/shared/service-item';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import popular1 from '@/assets/home-page/popular1.png';
import popular2 from '@/assets/home-page/popular2.jpg';
import popular3 from '@/assets/home-page/popular3.jpg';
import popular4 from '@/assets/home-page/popular4.jpg';
import popular5 from '@/assets/home-page/popular5.jpg';
import { useScrollWindow } from '@/hooks/use-scroll-window';

const services = [
  {
    title: 'Logo Design',
    subtitle: 'Build your brand',
    imageUrl: popular1
  },
  {
    title: 'WordPress',
    subtitle: 'Customize your site',
    imageUrl: popular2
  },
  {
    title: 'Voice Over',
    subtitle: 'Share your message',
    imageUrl: popular3
  },
  {
    title: 'Video Explainer',
    subtitle: 'Engage your audience',
    imageUrl: popular4
  },
  {
    title: 'Social Media',
    subtitle: 'Reach more people',
    imageUrl: popular5
  },
  {
    title: 'Social Media',
    subtitle: 'Reach more people',
    imageUrl: popular1
  },
  {
    title: 'Social Media',
    subtitle: 'Reach more people',
    imageUrl: popular2
  }
];

export default function PopularSection() {
  const { visibleItems, canScrollLeft, canScrollRight, scrollLeft, scrollRight } = useScrollWindow(services, 5);

  return (
    <section className='py-24 bg-white'>
      <div className='max-w-6xl mx-auto px-4'>
        <h2 className='text-2xl font-bold text-gray-800 mb-6'>Popular professional services</h2>

        <div className='relative flex items-center'>
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className={`absolute left-[20px] top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg transition-opacity ${
              !canScrollLeft ? 'opacity-30 cursor-not-allowed' : ''
            }`}
          >
            <ChevronLeft />
          </button>

          <div className='flex gap-4 overflow-hidden mx-auto px-12'>
            {visibleItems.map((item, index) => (
              <ServiceItem key={index} {...item} />
            ))}
          </div>

          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className={`absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg transition-opacity ${
              !canScrollRight ? 'opacity-30 cursor-not-allowed' : ''
            }`}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
