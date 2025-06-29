import AddComment from './compoments/addcomment';
import { JobTypeComment } from './compoments/comment';
import { Content } from './compoments/content';
import { Content2 } from './compoments/content2';
import FAQ from './compoments/FAQ';
import { JobTypeReview } from './compoments/review';

export default function JobTypePage3() {
  return (
    <>
      <div className='container mb-20'>
        <div className='flex flex-col md:flex-row gap-4 mt-4 mb-20'>
          <div className='w-[60%] mx-auto bg-white'>
            <Content />
            <FAQ />
            <JobTypeReview />
            <JobTypeComment />
            <AddComment />
          </div>
          <div className='w-[40%] mx-auto bg-white'>
            <Content2 />
          </div>
        </div>
      </div>
    </>
  );
}
