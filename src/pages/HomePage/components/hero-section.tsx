import SearchBar from '@/components/shared/search';
import { Button } from '@/components/ui/button';
import poster from '@/assets/poster5.png';
export default function HeroComponent() {
  return (
    <>
      <section className=' bg-red-400 bg-cover bg-center' style={{ backgroundImage: `url(${poster})` }}>
        <div className='container'>
          <div className=' h-[755px] flex items-center justify-between'>
            <div className='flex-1'>
              <h1 className='text-5xl font-bold text-white'>
                Find the perfect <span className='italic'>freelance</span> services for your business
              </h1>
              <div className='mt-8 w-full'>
                <SearchBar placeholder='Try "Building mobile app"' />
              </div>
              <div className='mt-8 flex items-center gap-4'>
                <div className='text-white'>Popular: </div>
                <div>
                  <Button className='bg-transparent text-white border border-white rounded-4xl transition-all duration-200 hover:bg-white hover:text-red-400 hover:cursor-pointer'>
                    Web Design
                  </Button>
                </div>
                <div className='text-white'>
                  <Button className='bg-transparent text-white border border-white rounded-4xl transition-all duration-200 hover:bg-white hover:text-red-400 hover:cursor-pointer'>
                    Wordpress
                  </Button>
                </div>
                <div className='text-white'>
                  <Button className='bg-transparent text-white border border-white rounded-4xl transition-all duration-200 hover:bg-white hover:text-red-400 hover:cursor-pointer'>
                    Logo Design
                  </Button>
                </div>
                <div className='text-white'>
                  <Button className='bg-transparent text-white border border-white rounded-4xl transition-all duration-200 hover:bg-white hover:text-red-400 hover:cursor-pointer'>
                    Drop Shipping
                  </Button>
                </div>
              </div>
            </div>
            <div className='flex-1'></div>
          </div>
        </div>
      </section>
    </>
  );
}
