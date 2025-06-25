// import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import HeroComponent from './componets/hero';
import ServiceRelated from './componets/servicerelated';
import ExploreComponent from './componets/explore';

export default function HomePage() {
  return (
    <div className='relative'>
      {/* <Header /> */}
      <HeroComponent />
      <ExploreComponent />
      <ServiceRelated />
      <Footer />
    </div>
  );
}
