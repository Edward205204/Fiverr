import Header from '@/components/shared/header';
import HeroComponent from './components/hero-section';
import TrustedBy from './components/trusted-section';
import PopularSection from './components/popular-section';
import InforSection from './components/infor-section';
import MarketplaceGrid from './components/marketplace-section';

export default function HomePage() {
  return (
    <div className='relative'>
      <Header />
      <HeroComponent />
      <TrustedBy />
      <PopularSection />
      <InforSection />
      <MarketplaceGrid />
    </div>
  );
}
