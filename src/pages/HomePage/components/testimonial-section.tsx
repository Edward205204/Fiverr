import VideoComponent from '@/components/shared/video-component';

export default function TestimonialVideo() {
  return (
    <section className='py-16 bg-white'>
      <div className='max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center px-6'>
        <div className='w-full h-64 md:h-72'>
          <VideoComponent src='https://files.vidstack.io/sprite-fight/720p.mp4' />
        </div>
        <div>
          <p className='text-sm text-gray-500 mb-2'>
            Kay Kim, Co-Founder <strong>rooted</strong>
          </p>
          <blockquote className='text-xl italic text-gray-800 mb-4'>
            "It’s extremely exciting that Fiverr has freelancers from all over the world — it broadens the talent pool.
            One of the best things about Fiverr is that while we’re sleeping, someone’s working."
          </blockquote>
          <button className='text-green-600 text-2xl'>→</button>
        </div>
      </div>
    </section>
  );
}
