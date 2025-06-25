import HeroComponent from './components/hero';
import ServiceRelated from './components/servicerelated';
import ExploreComponent from './components/explore';

export default function JobTypePage() {
  return (
    <div className='relative'>
      {/* <Header /> */}
      <HeroComponent />
      <ExploreComponent />
      <ServiceRelated />
    </div>
  );
}
