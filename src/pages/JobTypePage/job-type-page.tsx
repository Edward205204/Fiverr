import ExploreComponent from './components/explore';
import HeroComponent from './components/hero';
import ServiceRelated from './components/servicerelated';

export default function JobTypePage() {
  return (
    <div>
      <HeroComponent />
      <ExploreComponent />
      <ServiceRelated />
    </div>
  );
}
