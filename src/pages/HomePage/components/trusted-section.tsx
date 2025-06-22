import Meta from '@/assets/icons/meta-icon.svg';
import Google from '@/assets/icons/google-icon.svg';
import Netflix from '@/assets/icons/netflix-icon.svg';
import Pg from '@/assets/icons/pg-icon.svg';
import Paypal from '@/assets/icons/paypal-icon.svg';
import Payoneer from '@/assets/icons/payoneer-icon.svg';

export default function TrustedSection() {
  return (
    <section className='bg-[#fafafa] py-6 shadow-lg'>
      <div className='container mx-auto text-center'>
        <div className='flex flex-wrap justify-center items-center gap-10 opacity-80'>
          <div className='h-6 flex items-center'>
            <p className='text-sm text-gray-500  font-bold uppercase  '>Trusted by:</p>
          </div>
          <img src={Meta} alt='Meta' className='h-6' />
          <img src={Google} alt='Google' className='h-6' />
          <img src={Netflix} alt='Netflix' className='h-6' />
          <img src={Pg} alt='P&G' className='h-6' />
          <img src={Paypal} alt='Paypal' className='h-6' />
          <img src={Payoneer} alt='Payoneer' className='h-6' />
        </div>
      </div>
    </section>
  );
}
