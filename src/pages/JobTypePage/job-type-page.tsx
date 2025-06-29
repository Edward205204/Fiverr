import HeroComponent from './components/hero';
import ServiceRelated from './components/servicerelated';
import ExploreComponent from './components/explore';
import HorizontalScrollCategories from './components/categories';

export default function JobTypePage() {
  return (
    <div className='relative'>
      <HeroComponent />
      <ExploreComponent />
      <HorizontalScrollCategories />
      <ServiceRelated />
    </div>
  );
}
