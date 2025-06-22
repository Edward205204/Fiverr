interface ServiceItemProps {
  title: string;
  subtitle: string;
  imageUrl: string;
}

export default function ServiceItem({ title, subtitle, imageUrl }: ServiceItemProps) {
  return (
    <div className='min-w-[200px] max-w-[250px] flex-shrink-0 rounded-lg overflow-hidden cursor-pointer'>
      <div
        className='h-60 bg-cover bg-center text-white flex  flex-col-reverse justify-end p-4'
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <span className='text-sm font-medium text-shadow-lg'>{subtitle}</span>
        <h3 className='text-xl font-bold text-shadow-lg '>{title}</h3>
      </div>
    </div>
  );
}
