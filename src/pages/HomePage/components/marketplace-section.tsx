const categories = [
  { label: 'Graphics & Design', icon: '🎨' },
  { label: 'Digital Marketing', icon: '📣' },
  { label: 'Writing & Translation', icon: '✍️' },
  { label: 'Video & Animation', icon: '🎥' },
  { label: 'Music & Audio', icon: '🎵' },
  { label: 'Programming & Tech', icon: '💻' },
  { label: 'Business', icon: '📊' },
  { label: 'Lifestyle', icon: '🧘' },
  { label: 'Data', icon: '📈' }
];

export default function MarketplaceGrid() {
  return (
    <section className='py-16 bg-gray-50'>
      <div className='max-w-6xl mx-auto px-6'>
        <h2 className='text-xl font-bold text-gray-800 mb-8'>Explore the marketplace</h2>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
          {categories.map((cat, i) => (
            <div
              key={i}
              className='flex flex-col items-center text-center p-4 hover:cursor-pointer hover:bg-white rounded-lg transition'
            >
              <span className='text-3xl'>{cat.icon}</span>
              <span className='mt-2 text-sm text-gray-700 font-medium'>{cat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
