import VideoComponent from '@/components/shared/video-component';

export default function InforSection() {
  const features = [
    { title: 'The best for every budget', desc: 'High-quality services at every price point...', icon: '✅' },
    { title: 'Quality work done quickly', desc: 'Find the right freelancer to begin within minutes', icon: '⚡' },
    {
      title: 'Protected payments, every time',
      desc: 'Your payment isn’t released until you approve the work',
      icon: '🛡️'
    },
    { title: '24/7 support', desc: 'Support team always available', icon: '🕐' }
  ];

  return (
    <section className='bg-green-50 py-24'>
      <div className='max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center'>
        <div>
          <h2 className='text-3xl font-bold text-gray-800 mb-6'>
            A whole world of freelance talent at your fingertips
          </h2>
          <ul className='space-y-5'>
            {features.map((f, i) => (
              <li key={i} className='flex items-start gap-3'>
                <span className='text-green-600 text-xl'>{f.icon}</span>
                <div>
                  <h4 className='font-semibold'>{f.title}</h4>
                  <p className='text-gray-600 text-sm'>{f.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className='w-full h-64 md:h-80'>
          <VideoComponent src='https://www.youtube.com/watch?v=b_AG9IG1vRA&t=2s' className='w-full h-full' />
        </div>
      </div>
    </section>
  );
}
