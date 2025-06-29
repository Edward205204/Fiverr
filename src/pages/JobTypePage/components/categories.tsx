import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const designCategories = [
  {
    title: 'Logo & Brand Identity',
    items: ['Logo Design', 'Brand Style Guides', 'Fonts & Typography', 'Business Cards & Stationery'],
    image:
      'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/251526125/original/6037a38bbcf3a0f6d761a2ab8293f5733cfdc1c3/design-modern-minimalist-logo.jpg'
  },
  {
    title: 'Web & App Design',
    items: ['Website Design', 'App Design', 'UX Design', 'Landing Page Design', 'Icon Design'],
    image:
      'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/167904930/original/28bca0e4265ae0f9ce14c688dbd2df45ef58b3c1/create-an-eye-catching-website-design.jpg'
  },
  {
    title: 'Art & Illustration',
    items: [
      'Illustration',
      'NFT Art',
      'Pattern Design',
      'Portraits & Caricatures',
      'Cartoons & Comics',
      'Tattoo Design',
      'Storyboards'
    ],
    image:
      'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/168121809/original/2a8e42bb2fddabc8ad37cfeff2288a50f6fa6f64/draw-illustrations-and-concept-art.jpg'
  },
  {
    title: 'Marketing Design',
    items: ['Social Media Design', 'Email Design', 'Web Banners', 'Signage Design'],
    image:
      'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/272454844/original/84d994fbc5b1739f1bc32bfa9d6cb0ad7c1e04c1/create-marketing-and-social-media-posts.jpg'
  }
];

export default function HorizontalScrollCategories() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scrollAmount = 400;

  const checkScrollButtons = () => {
    const el = containerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  const scroll = (direction: 'left' | 'right') => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScrollButtons);
    checkScrollButtons();
    return () => el.removeEventListener('scroll', checkScrollButtons);
  }, []);

  return (
    <div className='relative w-full'>
      <button
        onClick={() => scroll('left')}
        disabled={!canScrollLeft}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white shadow rounded-full ${
          !canScrollLeft ? 'opacity-30 cursor-not-allowed' : ''
        }`}
      >
        <ChevronLeft />
      </button>

      <div ref={containerRef} className='flex overflow-x-auto scroll-smooth space-x-6 no-scrollbar px-12'>
        {designCategories.map((category, idx) => (
          <div key={idx} className='flex-none w-[300px] bg-white rounded-xl shadow p-4 hover:shadow-md transition-all'>
            <img src={category.image} alt={category.title} className='w-full h-[150px] object-cover rounded-md mb-4' />
            <h3 className='font-semibold text-lg mb-2'>{category.title}</h3>
            <ul className='space-y-1 text-gray-600 text-sm'>
              {category.items.map((item, i) => (
                <li key={i} className='hover:text-black cursor-pointer'>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll('right')}
        disabled={!canScrollRight}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white shadow rounded-full ${
          !canScrollRight ? 'opacity-30 cursor-not-allowed' : ''
        }`}
      >
        <ChevronRight />
      </button>
    </div>
  );
}
