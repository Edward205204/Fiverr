import HeroComponent from './components/hero';
import ServiceRelated from './components/servicerelated';
import HorizontalScrollCategories from './components/categories';
import JobTypeList from '@/components/shared/job-type-list';

export default function JobTypePage() {
  return (
    <div className='relative'>
      <JobTypeList />
      <HeroComponent />

      {/* list type job */}
      <HorizontalScrollCategories />

      <ServiceRelated />
    </div>
  );
}
